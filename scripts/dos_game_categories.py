#!/usr/bin/env python3
"""Work out which categories every DOS game belongs to.

The archive does not keep a genre of its own, so the categories are read
from the two places that do:

1. `games_types.json` — the manifest of `rwv/chinese-dos-games`, the project
   the bundles were mirrored from and the one the SHA256s in the archive
   index are checked against. Every game it knows carries a `type` code:
   ACT, SIM, RPG, AVG, PUZ, SLG, HGA, SPG, RTS. That code is the game's
   primary category.

2. `games_descriptions.json` — the descriptions the same project's site
   publishes for the games it writes about. A description names the
   genre outright ("a classic DOS role-playing game"), and where it names
   more than one ("combines adventure and role-playing elements") the game
   belongs to both.

So the rule is: the manifest decides the primary category, and a
description may add categories to it — never take one away. A game the
manifest leaves blank takes its category from the description instead.

Both files are cached in the archive directory next to the bundles, so the
result is reproducible without the network.

Run:
    python3 scripts/dos_game_categories.py

Writes:
    ~/git/dos/games_categories.json    the category of every game
"""

import argparse
import json
import os

# The accent colour each category carries — the same family as the marks
# the per-initial plates use, so the catalogue reads as one shelf.
ACCENTS = {
    'action': '#C0392B',
    'role-playing': '#2874A6',
    'simulation': '#117864',
    'strategy': '#1F618D',
    'adventure': '#B9770E',
    'puzzle': '#7D3C98',
    'text-adventure': '#AF7AC5',
    'tactics': '#626567',
    'real-time-strategy': '#148F77',
    'sports': '#D98880',
}

# The categories themselves — the labels the site shows, and the code the
# archive manifest files each one under.
#
# The order is the order the groups appear in the catalogue: the biggest
# first, because that is what a reader is looking for.
CATEGORIES = [
    {
        'id': 'action',
        'code': 'ACT',
        'label': 'Action',
        'blurb': 'Shooters, platformers and arcade games — the games where your hands are busy.',
    },
    {
        'id': 'role-playing',
        'code': 'RPG',
        'label': 'Role-playing',
        'blurb': 'Games about a character, a world and a story that grows with you.',
    },
    {
        'id': 'simulation',
        'code': 'SIM',
        'label': 'Simulation',
        'blurb': 'Flight decks, football tables, hospitals and harbours — systems you run rather than fight.',
    },
    {
        'id': 'strategy',
        'code': 'SLG',
        'label': 'Strategy',
        'blurb': 'Wargames and grand plans: armies, borders and economies.',
    },
    {
        'id': 'adventure',
        'code': 'AVG',
        'label': 'Adventure',
        'blurb': 'Point-and-click stories, mysteries and the games that are mostly about looking around.',
    },
    {
        'id': 'puzzle',
        'code': 'PUZ',
        'label': 'Puzzle',
        'blurb': 'Board games, block puzzles and the small satisfactions of a solved problem.',
    },
    {
        'id': 'text-adventure',
        'code': 'HGA',
        'label': 'Text adventure',
        'blurb': 'Dating sims and interactive fiction — games that are mostly words and pictures.',
    },
    {
        'id': 'tactics',
        'code': 'SPG',
        'label': 'Tactics',
        'blurb': 'Turn-based tactics and strategy role-playing — the 战棋 games, fought on a grid.',
    },
    {
        'id': 'real-time-strategy',
        'code': 'RTS',
        'label': 'Real-time strategy',
        'blurb': 'The ones that do not wait for you: base building under a clock.',
    },
    {
        'id': 'sports',
        'code': '',
        'label': 'Sports',
        'blurb': 'Football tables, tennis courts and race tracks.',
    },
]

# The label of a category, for the pages that show it as text.
LABELS = {category['id']: category['label'] for category in CATEGORIES}

# The codes in the manifest, and the category each one stands for.
#
# The codes are the archive's own classification, and they are not the
# standard abbreviations: `SPG` is not sports here. The games it holds
# are the turn-based tactics and strategy role-playing titles — the 战棋
# games — while the sports titles are filed under `SIM` with the other
# simulations. So `SPG` stands for tactics, and the sports games are
# picked up from the descriptions that name them.
CODE_TO_CATEGORY = {
    'ACT': 'action',
    'SIM': 'simulation',
    'RPG': 'role-playing',
    'AVG': 'adventure',
    'PUZ': 'puzzle',
    'SLG': 'strategy',
    'HGA': 'text-adventure',
    'SPG': 'tactics',
    'RTS': 'real-time-strategy',
}

# The genres a description may name, and the phrases that name them.
#
# The phrases are deliberately specific. A description is a paragraph of
# prose about the game, and "adventure" or "simulation" turn up in it as
# ordinary English long before they turn up as a label on the genre — so
# only the phrases that state the genre are matched, never the bare word.
DESCRIPTION_PHRASES = [
    ('real-time-strategy', ['即时战略', '实时战略', '实时策略玩法']),
    ('role-playing', ['角色扮演游戏', '角色扮演类', '角色扮演', 'RPG游戏', 'RPG类', 'RPG']),
    ('sports', [
        '体育游戏', '体育类游戏', '体育模拟', '体育运动', '运动游戏',
        '足球游戏', '足球模拟', '足球类', '网球游戏', '网球模拟',
        '篮球游戏', '赛车游戏', '竞速游戏', '保龄球游戏', '高尔夫',
    ]),
    ('strategy', [
        '策略游戏', '策略模拟', '策略类游戏', '策略类', '策略角色扮演',
        '战略模拟', '战略游戏', '策略型', '战棋',
        # A historical simulation is a strategy game in this taxonomy —
        # the Koei series and the Chinese ones beside it are filed as
        # such by the manifest itself.
        '历史模拟', '战争模拟', '军事模拟', '策略和',
    ]),
    ('simulation', [
        '模拟经营', '经营模拟', '经营类游戏', '经营类', '模拟类游戏',
        '养成游戏', '养成类',
        # The sims that are not businesses: a city, a hospital.
        '城市建设模拟', '城市模拟', '模拟城市', '医疗模拟',
    ]),
    ('action', [
        '动作游戏', '动作类游戏', '动作类', '动作冒险', '射击游戏',
        '射击类', '街机游戏', '平台游戏', '平台动作',
    ]),
    ('puzzle', [
        '益智游戏', '益智类', '益智解谜', '解谜游戏', '解谜类游戏',
        '解谜类', '拼图游戏', '解谜冒险', '冒险解谜',
    ]),
    ('text-adventure', [
        '文字冒险', '恋爱冒险', '视觉小说', '文字类游戏', '文字类冒险',
    ]),
    ('adventure', [
        '冒险游戏', '冒险类游戏', '冒险类', '冒险解谜', '解谜冒险',
        '冒险模拟', '冒险元素', '冒险和',
    ]),
]

# The one game neither source describes: the manifest lists it and links
# to the encyclopedia page that does. The genre is read off that page.
LINKED_SOURCES = {
    '同级生2': {
        'categories': ['text-adventure', 'adventure'],
        'source': 'Wikipedia, the page the manifest links for this game',
    },
}


def categories_in(description):
    """The categories a description names, in the order they are listed."""
    found = []
    for category, phrases in DESCRIPTION_PHRASES:
        if any(phrase in description for phrase in phrases):
            found.append(category)
    return found


def build(manifest, descriptions):
    """The category of every game in the manifest."""
    games = {}

    for identifier, record in manifest.items():
        code = record.get('type')
        primary = CODE_TO_CATEGORY.get(code) if code else None
        description = descriptions.get(identifier, '')

        named = categories_in(description) if description else []
        linked = LINKED_SOURCES.get(identifier)
        if linked:
            named = linked['categories'] + named

        if primary is None:
            # The manifest has no code for this game: the description, or
            # the page the manifest links, decides on its own.
            if not named:
                continue
            primary = named[0]

        types = [primary]
        for category in named:
            if category not in types:
                types.append(category)

        games[identifier] = {
            'primary': primary,
            'types': types,
            'source': (
                'manifest'
                if code
                else ('description' if description else 'linked source')
            ),
        }

    return games


def write_taxonomy(path, games):
    """The taxonomy the site reads: the labels, in the order they appear."""
    lines = [
        '/**',
        ' * The categories the DOS games are sorted into.',
        ' *',
        ' * Generated by `scripts/dos_game_categories.py` — do not edit by hand.',
        ' *',
        ' * A game can be in more than one category: the archive files it under',
        ' * one, and the description the same project publishes may name another',
        ' * as well. The catalogue shows a game under every category it belongs',
        ' * to, so the counts below overlap.',
        ' */',
        '',
        '/** One category — a group of the catalogue. */',
        'export type DosGameCategory = {',
        '  /** The id the data files use. */',
        '  id: string;',
        '  /** The label shown on the card and the group heading. */',
        '  label: string;',
        '  /** One line: what belongs here. */',
        '  blurb: string;',
        '  /** The code the archive manifest files this category under. */',
        '  code: string;',
        '  /** The accent colour the group carries. */',
        '  accent: string;',
        '};',
        '',
        '/** Every category, in the order the catalogue lists them. */',
        'export const DOS_GAME_CATEGORIES: DosGameCategory[] = [',
    ]

    for category in CATEGORIES:
        lines.append('  {')
        lines.append(f'    id: {json.dumps(category["id"], ensure_ascii=False)},')
        lines.append(f'    label: {json.dumps(category["label"], ensure_ascii=False)},')
        lines.append(f'    blurb: {json.dumps(category["blurb"], ensure_ascii=False)},')
        lines.append(f'    code: {json.dumps(category["code"], ensure_ascii=False)},')
        lines.append(f'    accent: {json.dumps(ACCENTS[category["id"]], ensure_ascii=False)},')
        lines.append('  },')

    lines.append('];')
    lines.append('')
    lines.append('/** The category of each id, for a lookup while rendering. */')
    lines.append('export const DOS_GAME_CATEGORY_BY_ID: Record<string, DosGameCategory> =')
    lines.append('  Object.fromEntries(DOS_GAME_CATEGORIES.map((category) => [category.id, category]));')
    lines.append('')
    lines.append('/**')
    lines.append(' * The label of a category, or the id itself when the category is')
    lines.append(' * one this build does not know — a game is never left nameless.')
    lines.append(' */')
    lines.append('export function categoryLabel(id: string): string {')
    lines.append('  return DOS_GAME_CATEGORY_BY_ID[id]?.label ?? id;')
    lines.append('}')
    lines.append('')

    with open(path, 'w', encoding='utf-8') as handle:
        handle.write('\n'.join(lines))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--types', default=os.path.expanduser('~/git/dos/games_types.json'))
    parser.add_argument('--descriptions', default=os.path.expanduser('~/git/dos/games_descriptions.json'))
    parser.add_argument('--out', default=os.path.expanduser('~/git/dos/games_categories.json'))
    parser.add_argument(
        '--taxonomy',
        default=os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
            'src/data/dos-games-categories.ts',
        ),
    )
    args = parser.parse_args()

    manifest = json.load(open(args.types, encoding='utf-8'))['games']
    descriptions = json.load(open(args.descriptions, encoding='utf-8'))

    games = build(manifest, descriptions)

    with open(args.out, 'w', encoding='utf-8') as handle:
        json.dump(games, handle, ensure_ascii=False, indent=1, sort_keys=True)

    write_taxonomy(args.taxonomy, games)

    counts = {}
    multi = 0
    for record in games.values():
        for category in record['types']:
            counts[category] = counts.get(category, 0) + 1
        if len(record['types']) > 1:
            multi += 1
    print(f'games: {len(games)}  in more than one category: {multi}')
    for category, count in sorted(counts.items(), key=lambda item: -item[1]):
        print(f'  {category}: {count}')
    print(f'wrote {args.out}')
    print(f'wrote {args.taxonomy}')


if __name__ == '__main__':
    main()
