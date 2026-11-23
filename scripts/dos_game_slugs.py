#!/usr/bin/env python3
"""Slug rules for the DOS games wiki — shared by the generator and the uploader.

A game's slug is its pinyin, lowercased and dash-joined. GitHub strips
non-ASCII characters out of release asset names, so the slug is also the
asset name on the release host: one name, used by the page URL, the
download URL and the file on disk.

The initial is the first letter of the slug: it is both the shelf group
the game sits in and the tag of the release that carries its bundle.
"""

import re
import unicodedata

try:
    from pypinyin import lazy_pinyin
except ImportError:  # pragma: no cover - the venv is set up by the operator
    lazy_pinyin = None


def _ascii_fallback(name):
    """A slug for a name with no Chinese in it (e.g. `F1赛车1994`)."""
    return unicodedata.normalize('NFKD', name).encode('ascii', 'ignore').decode()


def slug_for(name):
    """The pinyin slug of a game name.

    `三国志3` → `san-guo-zhi-3`, `F1赛车1994` → `f1-che-che-1994`.
    """
    if lazy_pinyin is not None:
        parts = lazy_pinyin(name)
    else:
        parts = [name]
    slug = '-'.join(
        re.sub(r'[^a-z0-9]+', '-', str(part).lower()).strip('-')
        for part in parts
        if str(part).strip()
    )
    slug = re.sub(r'-+', '-', slug).strip('-')
    if not slug:
        slug = re.sub(r'[^a-z0-9]+', '-', _ascii_fallback(name).lower()).strip('-')
    return slug or 'game'


def initial_for(slug):
    """The shelf group and release tag of a slug: its first alphanumeric."""
    for char in slug:
        if char.isalnum():
            return char.lower()
    return '0'


def unique_slug(name, taken):
    """A slug for `name` that is not already in `taken` (a set)."""
    base = slug_for(name)
    if base not in taken:
        taken.add(base)
        return base
    index = 2
    while f'{base}-{index}' in taken:
        index += 1
    final = f'{base}-{index}'
    taken.add(final)
    return final
