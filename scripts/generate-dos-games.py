#!/usr/bin/env python3
"""Generate the DOS games catalogue: one wiki page per game in the archive.

The archive in ~/git/dos/games holds 1 898 DOS games. Each one gets a page
in the WhereQ Atlas: the facts read out of the bundle itself, the download,
the setup the bundle's own shape implies, and an honest note about what has
and has not been tested on the emulator.

The pages that *have* been tested are written by hand — they live in
src/data/atlas-dos-games.ts and are skipped here.

Run:
    python3 scripts/generate-dos-games.py \
        --games ~/git/dos/games \
        --index ~/git/dos/games_index.csv \
        --metadata ~/git/whereq-dosbox-claude/data/dos-games-metadata.json

Writes:
    src/data/dos-games/<slug>.ts       the full page, one module per game
    src/data/dos-games-index.ts        the compact index the catalogue reads
    src/pages/dos-games/<slug>.tsx     one thin route per game
    static/img/dos-games/<slug>.svg    the mark on the card

The split matters: the index is what the catalogue page reads, so it has
to be small enough to sit in the site's shared bundle. The full text of a
game lives in its own module, which only its own route imports, so the
browser fetches one game's page at a time.

The catalogue sits outside the Atlas on purpose. The Atlas rail lists every
page of a collection, so a collection of 1 898 games would put a
1 898-item sidebar on every page — eight times the weight of a normal
page, for the whole site. The Atlas keeps the hand-written games; the
catalogue keeps the rest.
"""

import argparse
import csv
import json
import os
import re
import sys
import zipfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from dos_game_slugs import initial_for, unique_slug  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = 'whereq/dos-games'
RELEASE_HOST = f'https://github.com/{REPO}/releases/download'

# Games whose pages are written by hand — see src/data/atlas-dos-games.ts.
# The slug is the one their page already lives at.
MANUAL_SLUGS = {
    '三国志英杰传': 'sanguo-yingjie-zhuan',
    '真人快打': 'mortal-kombat',
}
MANUAL = set(MANUAL_SLUGS)

# A card mark per initial, so the shelf is not a wall of one colour.
ACCENTS = {
    'a': '#C0392B', 'b': '#B9770E', 'c': '#7D6608', 'd': '#6E7B05',
    'e': '#2874A6', 'f': '#1F618D', 'g': '#117864', 'h': '#148F77',
    'i': '#1E8449', 'j': '#229954', 'k': '#7D3C98', 'l': '#8E44AD',
    'm': '#AF7AC5', 'n': '#D98880', 'o': '#E59866', 'p': '#F5B041',
    'q': '#F8C471', 'r': '#F1948A', 's': '#EC7063', 't': '#CD6155',
    'u': '#A04000', 'v': '#B03A2E', 'w': '#7F8C8D', 'x': '#909497',
    'y': '#626567', 'z': '#515A5A', '0': '#34495E',
}


def ts(value):
    """A TypeScript string literal."""
    return json.dumps(value, ensure_ascii=False)


def megabytes(size):
    if size >= 1024 * 1024:
        return f'{size / (1024 * 1024):.1f} MB'
    if size >= 1024:
        return f'{size / 1024:.0f} KB'
    return f'{size} bytes'


def human_files(count):
    return f'{count:,}' if count > 999 else str(count)


def first_character(name):
    """The first visible character of a name, for the card mark."""
    for char in name:
        if char.strip():
            return char
    return '#'


def plate_svg(name, slug, accent):
    """The mark for a catalogue card: the first character on a coloured plate."""
    letter = first_character(name)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="{name}">
  <title>{name}</title>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="{accent}"/>
      <stop offset="1" stop-color="{accent}" stop-opacity="0.72"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" fill="url(#g)"/>
  <rect x="1" y="1" width="62" height="62" fill="none" stroke="#000" stroke-opacity="0.18" stroke-width="2"/>
  <text x="32" y="44" text-anchor="middle" font-family="'Noto Serif CJK TC','Noto Serif TC','Songti TC','PMingLiU',serif" font-size="38" font-weight="700" fill="#FFF8E7">{letter}</text>
</svg>
'''


def published_sentence(meta):
    """What the bundle says about when the game was made."""
    files = meta.get('yearFiles')
    copy = meta.get('yearCopyright')
    if files and copy and files == copy:
        return (f"The bundle's own files are dated {files}, and the executable carries "
                f'a matching copyright line — {meta.get("yearCopyrightFrom", "")}'.strip())
    if files:
        extra = ''
        if copy and copy != files:
            extra = (f' The executable also carries a {copy} copyright line, which belongs to '
                     f'the runtime library it links rather than to the game.')
        return f"The bundle's own files are dated {files}, which is when this copy was built.{extra}"
    if copy:
        return f'The executable carries a copyright line from {copy}.'
    return 'The archive does not date this one.'


def publisher_sentence(meta):
    """What the bundle says about who made it."""
    if meta.get('publisher'):
        return (f"The publisher is {meta['publisher']}, named on the copyright line inside "
                f'the program.')
    if meta.get('publisherSeen'):
        return (f"The name {meta['publisherSeen']} appears inside the program, though not on a "
                f"copyright line — the publisher is most likely {meta['publisherSeen']}.")
    return None


def language_sentence(meta):
    """Whether the program speaks Chinese or English, read off its own strings."""
    language = meta.get('language')
    if language == 'chinese':
        return 'The text inside the program is Chinese.'
    if language == 'english':
        return 'The text inside the program is English.'
    return None


def build_entry(game, meta, slug, tag, accent):
    """One catalogue entry, as the Atlas wants it."""
    name = game['name']
    entry_point = meta.get('entryExecutable') or game['indexExecutable'] or '—'
    files = game['files']
    size = game['bytes']
    year = meta.get('yearFiles')
    publisher = publisher_sentence(meta)

    tagline = f"MS-DOS{' · ' + str(year) if year else ''} — {human_files(files)} files, {megabytes(size)}."

    summary = (
        f'{name} is a DOS game in the WhereQ archive — '
        f'{str(year) if year else "an undated copy"}, {human_files(files)} files, '
        f'{megabytes(size)}, and an entry point of {entry_point}.'
    )

    sentences = [f'{name} is a DOS game in the WhereQ archive.']
    if publisher:
        sentences.append(publisher)
    sentences.append(published_sentence(meta))
    sentences.append(
        f'The copy is the program as it was distributed: {human_files(files)} files, '
        f'{megabytes(size)}, and an entry point of {entry_point}.'
    )
    overview = ' '.join(sentences)

    facts = []
    facts.append({'label': 'Developer', 'value': meta.get('publisher') or meta.get('publisherSeen') or 'Not stated in the bundle'})
    facts.append({'label': 'Published', 'value': str(year) if year else 'Not dated'})
    facts.append({'label': 'Platform', 'value': 'MS-DOS'})
    facts.append({'label': 'Entry point', 'value': entry_point})
    facts.append({'label': 'Bundle', 'value': f'{human_files(files)} files · {megabytes(size)}'})

    # ── The setup, read from the shape of the bundle ────────────
    setup = []
    entry_is_batch = entry_point.lower().endswith(('.bat', '.cmd'))
    if entry_is_batch:
        setup.append({
            'kind': 'paragraph',
            'text': (f'The bundle starts with a batch file, {entry_point}. WhereQ-DOSBox runs the '
                     f'batch file when you press Play, and a batch file of this kind normally sets '
                     f'the paths up and then starts the game — which is why this one needs no '
                     f'launcher of its own.'),
        })
    else:
        setup.append({
            'kind': 'paragraph',
            'text': (f'The entry point is {entry_point}. Import the zip into WhereQ-DOSBox and press '
                     f'Play, and the app starts that program.'),
        })

    if game['diskimages']:
        images = '、'.join(game['diskimages'][:4])
        setup.append({
            'kind': 'paragraph',
            'text': (f'The bundle also ships a disk image ({images}) — a copy of the original '
                     f'floppy. If the game asks for a drive it cannot find, mount the image in the '
                     f'DOSBox prompt with IMGMOUNT D <file> and run it from D:.'),
        })

    if game['coms']:
        setup.append({
            'kind': 'paragraph',
            'text': (f'It carries {human_files(len(game["coms"]))} COM file(s) — the DOS loaders the '
                     f'program needs before it starts, the way a game with an XMS driver loads it '
                     f'first.'),
        })

    setup.append({
        'kind': 'paragraph',
        'text': ('This setup has not been played through on the emulator yet. If it does not work '
                 'for you, the comment thread at the bottom of this page is where to say so — and '
                 'what worked is worth writing down.'),
    })

    # ── What is in the bundle ───────────────────────────────────
    rows = [['Entry point', entry_point]]
    if game['exes']:
        rows.append(['Executables', '、'.join(sorted(game['exes'])[:8])])
    if game['bats']:
        rows.append(['Batch launchers', '、'.join(sorted(game['bats'])[:8])])
    if game['coms']:
        rows.append(['COM loaders', '、'.join(sorted(game['coms'])[:8])])
    if game['diskimages']:
        rows.append(['Disk images', '、'.join(game['diskimages'][:8])])
    rows.append(['Other files', f'{human_files(game["datafiles"])} data file(s)'])
    rows.append(['Total', f'{human_files(files)} files · {megabytes(size)}'])

    sections = [
        {
            'title': 'What it is',
            'blocks': [
                {'kind': 'paragraph', 'text': overview},
                {'kind': 'paragraph', 'text': (
                    'This page is generated from the bundle itself: the file list, the dates and the '
                    'checksum below are read out of the archive, not written from memory. The '
                    'hand-written pages on this shelf — the ones with a drawn card mark — are the '
                    'ones that have been played through on an emulator.')},
            ],
        },
        {
            'title': 'Download the bundle',
            'blocks': [
                {'kind': 'paragraph', 'text': 'The bundle is served from the WhereQ release host, byte for byte as it is in the archive.'},
                {'kind': 'table', 'head': ['Field', 'Value'], 'rows': [
                    ['File', f'{slug}.zip'],
                    ['Size', f'{human_files(size)} bytes ({megabytes(size)})'],
                    ['SHA-256', game['sha256']],
                    ['Files', human_files(files)],
                    ['Original', f'dos-bin.zczc.cz — {game["source_url"]}'],
                ]},
                {'kind': 'links', 'items': [
                    {'label': f'Download {name} ({megabytes(size)})',
                     'href': f'{RELEASE_HOST}/{tag}/{slug}.zip',
                     'external': True},
                ]},
            ],
        },
        {
            'title': 'Set it up in WhereQ-DOSBox',
            'blocks': setup,
        },
        {
            'title': 'How to play',
            'blocks': [
                {'kind': 'paragraph', 'text': (
                    'Nobody has written down how this one starts yet. Import it, press Play, and tell '
                    'us what happens — if it asks for a password, a serial number or a word from a '
                    'manual, that is exactly the thing worth writing down.')},
                {'kind': 'paragraph', 'text': (
                    'The pages that have been played through on an emulator sit alongside this one on '
                    'the shelf, and they tell you the whole route in: which file to start, which key '
                    'opens the menu, and which screen comes next.')},
            ],
        },
        {
            'title': 'What is in the bundle',
            'blocks': [
                {'kind': 'table', 'head': ['Part', 'What it holds'], 'rows': rows},
            ],
        },
        {
            'title': 'Where the facts come from',
            'blocks': [
                {'kind': 'list', 'items': [
                    'The bundle itself — its file list, its file dates and the strings inside its entry point.',
                    'The archive index, for the size and the SHA-256 above.',
                    f'The original copy, at {game["source_url"]}.',
                ]},
            ],
        },
    ]

    return {
        'id': slug,
        'collection': 'dos-games',
        'name': name,
        'role': 'DOS Game',
        'tagline': tagline,
        'accent': accent,
        'group': tag,
        'summary': summary,
        'status': str(year) if year else 'Archive',
        'url': f'{RELEASE_HOST}/{tag}/{slug}.zip',
        'facts': facts,
        'sections': sections,
    }


def write_full_entry(handle, entry):
    """One game's full page, as a module of its own."""
    handle.write('''/**
 * A generated page from the DOS games catalogue.
 *
 * Generated by `scripts/generate-dos-games.py` — do not edit by hand.
 */

import {AtlasEntry} from '../atlas-types';

const entry: AtlasEntry = {
''')
    handle.write(f'  id: {ts(entry["id"])},\n')
    handle.write(f'  collection: {ts(entry["collection"])},\n')
    handle.write(f'  name: {ts(entry["name"])},\n')
    handle.write(f'  role: {ts(entry["role"])},\n')
    handle.write(f'  tagline: {ts(entry["tagline"])},\n')
    handle.write(f'  accent: {ts(entry["accent"])},\n')
    handle.write(f'  group: {ts(entry["group"])},\n')
    handle.write(f'  summary: {ts(entry["summary"])},\n')
    handle.write(f'  status: {ts(entry["status"])},\n')
    handle.write(f'  url: {ts(entry["url"])},\n')
    handle.write('  facts: [\n')
    for fact in entry['facts']:
        handle.write(f'    {{label: {ts(fact["label"])}, value: {ts(fact["value"])}}},\n')
    handle.write('  ],\n')
    handle.write('  sections: [\n')
    for section in entry['sections']:
        handle.write('    {\n')
        handle.write(f'      title: {ts(section["title"])},\n')
        handle.write('      blocks: [\n')
        for block in section['blocks']:
            kind = block['kind']
            if kind == 'paragraph':
                handle.write(f'        {{kind: {ts(kind)}, text: {ts(block["text"])}}},\n')
            elif kind == 'list':
                handle.write(f'        {{kind: {ts(kind)}, items: [\n')
                for item in block['items']:
                    handle.write(f'          {ts(item)},\n')
                handle.write('        ]},\n')
            elif kind == 'table':
                handle.write(f'        {{kind: {ts(kind)}, head: {ts(block["head"])}, rows: [\n')
                for row in block['rows']:
                    cells = ', '.join(ts(cell) for cell in row)
                    handle.write(f'          [{cells}],\n')
                handle.write('        ]},\n')
            elif kind == 'links':
                handle.write(f'        {{kind: {ts(kind)}, items: [\n')
                for item in block['items']:
                    handle.write(
                        f'          {{label: {ts(item["label"])}, href: {ts(item["href"])}, '
                        f'external: {json.dumps(item.get("external", True))}}},\n'
                    )
                handle.write('        ]},\n')
        handle.write('      ],\n')
        handle.write('    },\n')
    handle.write('  ],\n')
    handle.write('};\n\n')
    handle.write('export default entry;\n')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--games', default='/home/whereq/git/dos/games')
    parser.add_argument('--index', default='/home/whereq/git/dos/games_index.csv')
    parser.add_argument('--metadata', default='/home/whereq/git/whereq-dosbox-claude/data/dos-games-metadata.json')
    parser.add_argument('--manifest', default='/home/whereq/git/whereq-dosbox-claude/data/dos-games-manifest.json')
    parser.add_argument('--routes', default=os.path.join(ROOT, 'src/pages/dos-games'))
    parser.add_argument('--pages', default=os.path.join(ROOT, 'src/data/dos-games'))
    parser.add_argument('--images', default=os.path.join(ROOT, 'static/img/dos-games'))
    parser.add_argument('--out', default=os.path.join(ROOT, 'src/data/dos-games-index.ts'))
    args = parser.parse_args()

    metadata = {}
    if os.path.exists(args.metadata):
        for record in json.load(open(args.metadata, encoding='utf-8')):
            metadata[record['identifier']] = record

    with open(args.index, newline='', encoding='utf-8') as handle:
        rows = list(csv.DictReader(handle))

    taken = set()
    entries = []
    index_rows = []
    manifest = []
    groups = {}

    os.makedirs(args.pages, exist_ok=True)
    os.makedirs(args.routes, exist_ok=True)
    os.makedirs(args.images, exist_ok=True)

    for row in rows:
        identifier = row['identifier']
        if identifier in MANUAL:
            continue

        path = os.path.join(args.games, identifier + '.zip')
        if not os.path.exists(path):
            continue

        with zipfile.ZipFile(path) as archive:
            names = [n for n in archive.namelist() if not n.endswith('/')]
            exes, bats, coms, images = [], [], [], []
            for entry_name in names:
                base = os.path.basename(entry_name)
                if not base:
                    continue
                low = base.lower()
                if low.endswith('.exe'):
                    exes.append(base)
                elif low.endswith(('.bat', '.cmd')):
                    bats.append(base)
                elif low.endswith('.com'):
                    coms.append(base)
                elif low.endswith(('.img', '.ima', '.iso')):
                    images.append(base)

        meta = metadata.get(identifier, {})
        meta.setdefault('entryExecutable', None)
        if not meta.get('entryExecutable'):
            wanted = (row['executable'] or '').lower()
            match = [e for e in exes if e.lower() == wanted]
            if match:
                meta['entryExecutable'] = match[0]
            elif exes:
                meta['entryExecutable'] = exes[0]
            elif bats:
                meta['entryExecutable'] = bats[0]
            elif coms:
                meta['entryExecutable'] = coms[0]

        name = row['name_zh'] or identifier
        slug = unique_slug(name, taken)
        tag = initial_for(slug)
        accent = ACCENTS.get(tag, '#5D6D7E')

        game = {
            'name': name,
            'files': len(names),
            'bytes': int(row['bytes']) if row['bytes'] else 0,
            'sha256': row['sha256'],
            'source_url': row['source_url'],
            'indexExecutable': row['executable'],
            'exes': exes,
            'bats': bats,
            'coms': coms,
            'diskimages': images,
            'datafiles': max(0, len(names) - len(exes) - len(bats) - len(coms) - len(images)),
        }
        entry = build_entry(game, meta, slug, tag, accent)
        entries.append(entry)
        year = meta.get('yearFiles')
        index_rows.append({
            'id': slug,
            'name': name,
            'year': str(year) if year else '',
            'size': game['bytes'],
            'files': game['files'],
            'entry': meta.get('entryExecutable') or game['indexExecutable'] or '—',
            'tag': tag,
            'url': entry['url'],
            'page': f'/dos-games/{slug}/',
        })
        groups.setdefault(tag, []).append(slug)
        manifest.append({
            'identifier': identifier,
            'name': name,
            'slug': slug,
            'tag': tag,
            'bytes': game['bytes'],
            'sha256': game['sha256'],
            'path': path,
            'year': meta.get('yearFiles'),
        })

        # ── the route and the card mark ─────────────────────────
        route = os.path.join(args.routes, f'{slug}.tsx')
        with open(route, 'w', encoding='utf-8') as handle:
            handle.write(
                'import React from \'react\';\n'
                'import DosGamePage from \'../../components/DosGames/DosGamePage\';\n'
                'import entry from \'../../data/dos-games/'
                f'{slug}\';\n\n'
                f'/** {name} — the DOS games catalogue. */\n'
                'export default function DosGame(): React.JSX.Element {\n'
                '  return <DosGamePage entry={entry} />;\n'
                '}\n'
            )

        page = os.path.join(args.pages, f'{slug}.ts')
        with open(page, 'w', encoding='utf-8') as handle:
            write_full_entry(handle, entry)

        image = os.path.join(args.images, f'{slug}.svg')
        if not os.path.exists(image):
            with open(image, 'w', encoding='utf-8') as handle:
                handle.write(plate_svg(name, slug, accent))

    # ── the groups ───────────────────────────────────────────────
    group_entries = []
    for tag in sorted(groups):
        titles = {
            '0': 'Names that start with a number',
        }
        title = titles.get(tag, f'{tag.upper()} — names that start with “{tag.upper()}”')
        blurb = (
            f'The {len(groups[tag])} games in the archive whose name begins with '
            f'“{tag.upper()}”.'
        )
        group_entries.append({'id': tag, 'title': title, 'blurb': blurb})

    # The hand-written pages are skipped above, but they still belong in the
    # catalogue: the reader should find 三国志英杰传 in the list, and be sent
    # to its page on the Atlas shelf. Their bundles also need a home on the
    # release host — the whole archive goes there.
    with open(args.index, newline='', encoding='utf-8') as handle:
        all_rows = {row['identifier']: row for row in csv.DictReader(handle)}
    for identifier, slug in sorted(MANUAL_SLUGS.items()):
        row = all_rows.get(identifier)
        if not row:
            continue
        tag = initial_for(slug)
        size = int(row['bytes']) if row['bytes'] else 0
        files = 0
        entry_point = row['executable'] or '—'
        path = os.path.join(args.games, identifier + '.zip')
        if os.path.exists(path):
            with zipfile.ZipFile(path) as archive:
                names = [n for n in archive.namelist() if not n.endswith('/')]
            files = len(names)
            exes = [os.path.basename(n) for n in names if n.lower().endswith('.exe')]
            if exes:
                entry_point = exes[0]
        manifest.append({
            'identifier': identifier,
            'name': row['name_zh'] or identifier,
            'slug': slug,
            'tag': tag,
            'bytes': size,
            'sha256': row['sha256'],
            'path': path,
            'year': None,
        })
        index_rows.append({
            'id': slug,
            'name': row['name_zh'] or identifier,
            'year': '',
            'size': size,
            'files': files,
            'entry': entry_point,
            'tag': tag,
            'url': f'{RELEASE_HOST}/{tag}/{slug}.zip',
            'page': f'/atlas/dos-games/{slug}/',
        })

    # ── the index ───────────────────────────────────────────────
    #
    # Only what the catalogue page reads: one line per game. The full text
    # of a game lives in its own module, imported by its own route.
    with open(args.out, 'w', encoding='utf-8') as handle:
        handle.write('''/**
 * The DOS games catalogue — the index, generated rather than written.
 *
 * One line per game in the archive at ~/git/dos/games: what the catalogue
 * page lists, and what the search box searches. The full page of a game
 * lives in `src/data/dos-games/<slug>.ts`, imported only by that game's
 * own route, so the browser fetches one game at a time.
 *
 * The two games that have been played through on an emulator keep their
 * pages on the Atlas shelf, so their `page` points there.
 *
 * Regenerate with `python3 scripts/generate-dos-games.py`. Do not edit it
 * by hand — the generator overwrites it.
 */

/** One line of the catalogue. */
export type DosGameIndexEntry = {
  /** The page id — the slug the URL is built from. */
  id: string;
  /** The name, as the archive knows it. */
  name: string;
  /** The year the bundle's own files are dated. */
  year: string;
  /** The size of the bundle, in bytes. */
  size: number;
  /** How many files the bundle holds. */
  files: number;
  /** The file the bundle wants to be started from. */
  entry: string;
  /** The first letter of the name — the letter its release sits under. */
  tag: string;
  /** The download, on the release host. */
  url: string;
  /** Where the game's own page lives on this site. */
  page: string;
};

/** Every game in the archive. */
export const DOS_GAMES_INDEX: DosGameIndexEntry[] = [
''')
        for row in index_rows:
            handle.write('  {\n')
            handle.write(f'    id: {ts(row["id"])},\n')
            handle.write(f'    name: {ts(row["name"])},\n')
            handle.write(f'    year: {ts(row["year"])},\n')
            handle.write(f'    size: {row["size"]},\n')
            handle.write(f'    files: {row["files"]},\n')
            handle.write(f'    entry: {ts(row["entry"])},\n')
            handle.write(f'    tag: {ts(row["tag"])},\n')
            handle.write(f'    url: {ts(row["url"])},\n')
            handle.write(f'    page: {ts(row["page"])},\n')
            handle.write('  },\n')
        handle.write('];\n')

    with open(args.manifest, 'w', encoding='utf-8') as handle:
        json.dump(manifest, handle, ensure_ascii=False, indent=1)
    print(f'entries: {len(entries)}  groups: {len(group_entries)}  routes: {len(entries)}')
    print(f'wrote {args.out}')


if __name__ == '__main__':
    main()
