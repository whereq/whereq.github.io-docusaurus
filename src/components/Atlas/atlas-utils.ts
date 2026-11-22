import { ATLAS_APPS, ATLAS_GROUPS, AtlasApp, AtlasGroup } from '../../data/atlas';

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

/** Look an application up by id — a missing one is a build error, not a blank page. */
export function appById(id: string): AtlasApp {
  const found = ATLAS_APPS.find((app) => app.id === id);
  if (!found) {
    throw new Error(`Unknown application: ${id}`);
  }
  return found;
}

/** Look a group up by id — a missing one is a build error. */
export function groupById(id: string): AtlasGroup {
  const found = ATLAS_GROUPS.find((group) => group.id === id);
  if (!found) {
    throw new Error(`Unknown group: ${id}`);
  }
  return found;
}

/** The applications of a group, in the order the data file lists them. */
export function appsInGroup(groupId: string): AtlasApp[] {
  return ATLAS_APPS.filter((app) => app.group === groupId);
}

/** The path of an application's page in the Atlas. */
export function appPath(id: string): string {
  return `/atlas/${id}`;
}

/** The GitHub URL of an application's repository. */
export function repoUrl(repo: string): string {
  return `https://github.com/whereq/${repo}`;
}
