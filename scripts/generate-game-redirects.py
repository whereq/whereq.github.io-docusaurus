#!/usr/bin/env python3
"""Generate the redirect table for the games that moved to pclegends.games.

The DOS games used to be published on the docs hub: 1 893 generated pages
under /dos-games/<slug> and five hand-written ones under
/atlas/dos-games/<slug>. They now live on their own domain, and the docs
hub answers those URLs with a redirect to where the game went.

Run:

    python3 scripts/generate-game-redirects.py \
        --games ~/git/pclegends.games/src/pages/dos-games

Writes:

    src/data/game-redirects.ts

The list of games is read from the games site's own route directory, so the
two cannot drift: a game that exists there has a redirect here.

The redirects are cross-domain, so `to` is an absolute URL. The plugin
writes one small HTML file per redirect — a meta refresh, a canonical link
and a script that replaces the location — at the path the game used to
have, which is where the old page was.
"""

import argparse
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Where the games went.
TARGET = 'https://pclegends.games'

# The old path of a game, and the new one.
OLD_COLLECTION = '/atlas/dos-games'
NEW_COLLECTION = '/dos-games'


def ts(value):
    """A TypeScript string literal."""
    return json.dumps(value, ensure_ascii=False)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--games',
        default=os.path.expanduser('~/git/pclegends.games/src/pages/dos-games'),
        help='the route directory of the games site',
    )
    parser.add_argument(
        '--atlas',
        default=os.path.join(ROOT, 'src/pages/atlas/dos-games'),
        help='the old Atlas shelf routes, before the games moved',
    )
    parser.add_argument(
        '--out',
        default=os.path.join(ROOT, 'src/data/game-redirects.ts'),
    )
    args = parser.parse_args()

    if not os.path.isdir(args.games):
        print(f'error: no such directory: {args.games}', file=sys.stderr)
        return 1

    slugs = sorted(
        os.path.splitext(name)[0]
        for name in os.listdir(args.games)
        if name.endswith('.tsx') and name != 'index.tsx'
    )
    if not slugs:
        print(f'error: no game routes in {args.games}', file=sys.stderr)
        return 1

    # Only five games were ever published under the Atlas shelf. The rest
    # only ever lived under /dos-games/, so a redirect for an Atlas path
    # that never existed would be noise.
    atlas_slugs = []
    if os.path.isdir(args.atlas):
        atlas_slugs = sorted(
            os.path.splitext(name)[0]
            for name in os.listdir(args.atlas)
            if name.endswith('.tsx') and name != 'index.tsx'
        )

    redirects = []

    # The catalogue itself.
    redirects.append((
        '/dos-games/',
        f'{TARGET}{NEW_COLLECTION}/',
    ))
    redirects.append((
        f'{OLD_COLLECTION}/',
        f'{TARGET}{NEW_COLLECTION}/',
    ))

    # Every game. The generated games keep their path; the hand-written ones
    # move up out of the Atlas shelf and into the catalogue beside them.
    for slug in slugs:
        redirects.append((
            f'{NEW_COLLECTION}/{slug}',
            f'{TARGET}{NEW_COLLECTION}/{slug}/',
        ))
    for slug in atlas_slugs:
        redirects.append((
            f'{OLD_COLLECTION}/{slug}',
            f'{TARGET}{NEW_COLLECTION}/{slug}/',
        ))

    with open(args.out, 'w', encoding='utf-8') as handle:
        handle.write('''/**
 * The games moved to their own domain.
 *
 * The DOS games used to be published here: 1 893 generated pages under
 * /dos-games/<slug> and five hand-written ones under /atlas/dos-games/<slug>.
 * They now live on <https://pclegends.games>, and this table is what the
 * old URLs answer with — a redirect to where the game went.
 *
 * The list is generated rather than written, from the games site's own
 * route directory, so a game that exists there has a redirect here.
 * Regenerate with `python3 scripts/generate-game-redirects.py`. Do not edit
 * it by hand — the generator overwrites it.
 */

/** One redirect: the path that answers here, and where it goes. */
export type GameRedirect = {
  /** The path this site used to serve. */
  from: string;
  /** Where it goes — an absolute URL, because the games have their own domain. */
  to: string;
};

/** Every game URL the docs hub used to publish. */
export const GAME_REDIRECTS: GameRedirect[] = [
''')
        for old, new in redirects:
            handle.write(f'  {{from: {ts(old)}, to: {ts(new)}}},\n')
        handle.write('];\n')

    print(f'games: {len(slugs)}  redirects: {len(redirects)}')
    print(f'wrote {args.out}')
    return 0


if __name__ == '__main__':
    sys.exit(main())
