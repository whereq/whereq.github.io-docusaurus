import {
  ATLAS_COLLECTIONS,
  ATLAS_ENTRIES,
  AtlasCollection,
  AtlasEntry,
  AtlasGroup,
} from '../../data/atlas';

/**
 * A heading becomes an anchor id. Keep it to lowercase words joined by
 * dashes, so the ids stay stable and readable in a URL fragment.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Look a page up by id — a missing one is a build error, not a blank page. */
export function entryById(id: string): AtlasEntry {
  const found = ATLAS_ENTRIES.find((entry) => entry.id === id);
  if (!found) {
    throw new Error(`Unknown Atlas page: ${id}`);
  }
  return found;
}

/** Look a collection up by id — a missing one is a build error. */
export function collectionById(id: string): AtlasCollection {
  const found = ATLAS_COLLECTIONS.find((collection) => collection.id === id);
  if (!found) {
    throw new Error(`Unknown Atlas collection: ${id}`);
  }
  return found;
}

/** Look a group up inside a collection — a missing one is a build error. */
export function groupById(collectionId: string, groupId: string): AtlasGroup {
  const found = collectionById(collectionId).groups.find(
    (group) => group.id === groupId,
  );
  if (!found) {
    throw new Error(`Unknown group ${groupId} in collection ${collectionId}`);
  }
  return found;
}

/** The pages of one collection, in the order the data file lists them. */
export function entriesInCollection(collectionId: string): AtlasEntry[] {
  return ATLAS_ENTRIES.filter((entry) => entry.collection === collectionId);
}

/** The pages of one group, in the order the data file lists them. */
export function entriesInGroup(collectionId: string, groupId: string): AtlasEntry[] {
  return entriesInCollection(collectionId).filter((entry) => entry.group === groupId);
}

/** The path of the Atlas home. */
export const ATLAS_HOME = '/atlas/';

/** The path of a collection's page. */
export function collectionPath(id: string): string {
  return `/atlas/${id}/`;
}

/** The path of a page inside its collection. */
export function entryPath(collectionId: string, entryId: string): string {
  return `/atlas/${collectionId}/${entryId}/`;
}

/** The GitHub URL of a project's repository. */
export function repoUrl(repo: string): string {
  return `https://github.com/whereq/${repo}`;
}

/**
 * The mark for an entry: its logo when it has one, and a monogram made
 * from its initials when it does not. The reference pages are not
 * WhereQ products, so they have no logo to show.
 */
export function monogram(name: string): string {
  const words = name
    .replace(/[^\w\s.]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return '?';
  }
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}
