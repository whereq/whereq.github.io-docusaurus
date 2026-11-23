/**
 * The shape of the WhereQ Atlas.
 *
 * The Atlas is a wiki, not a directory: it holds *collections*, each with
 * its own groups and pages, and the pages may belong to subjects that have
 * nothing to do with each other. WhereQ Universe is one collection among
 * them; the References shelf and the Glossary are others.
 *
 * These types live apart from the content so that a new collection can be
 * added without touching the others.
 */

/** A block of content inside a section. */
export type AtlasBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'table'; head: string[]; rows: string[][] }
  | { kind: 'links'; items: AtlasLink[] };

export type AtlasLink = {
  label: string;
  href: string;
  /** External links open in a new tab; in-site links do not. */
  external?: boolean;
};

/** A body section inside a page. */
export type AtlasSection = {
  title: string;
  blocks: AtlasBlock[];
};

/** A titled group of pages inside a collection. */
export type AtlasGroup = {
  id: string;
  title: string;
  blurb: string;
};

/** One row of a page's "at a glance" infobox — author, published, platform. */
export type AtlasFact = {
  label: string;
  value: string;
};

/** One page in the Atlas. */
export type AtlasEntry = {
  /** The page's id — unique across the whole Atlas. */
  id: string;
  /** The collection this page belongs to, e.g. `universe`. */
  collection: string;
  /** The name as the Atlas knows it. */
  name: string;
  /** The one-line role, e.g. `The Data Platform`. */
  role: string;
  /** One line: the idea behind the page. */
  tagline: string;
  /** The logo, under `/img/apps/` or `/img/refs/`. */
  logo?: string;
  /** The subject's own accent colour. */
  accent: string;
  /** The group this page is listed under, within its collection. */
  group: string;
  /** The universe question this page owns — only six pages carry one. */
  question?: string;
  /** The one-paragraph description. */
  summary: string;
  /** Where it stands today. */
  status?: string;
  /** The live thing, when it has a hosted instance or a home page. */
  url?: string;
  /** The GitHub repository — set only for the open source projects. */
  repo?: string;
  /** What it does, as a flat list. */
  capabilities?: string[];
  /** The body of the page. */
  sections: AtlasSection[];
  /**
   * Extra rows for the "at a glance" infobox. The fixed rows — role,
   * collection, domain — are always there; a game page adds its own.
   */
  facts?: AtlasFact[];
  /**
   * A notice band, shown under the header. The DOS games carry their
   * licence notice here: what the download is for, and that it comes
   * down if the rightsholder asks.
   */
  notice?: {
    title: string;
    text: string;
  };
  /** Extra links, beyond the headline ones. */
  links?: AtlasLink[];
  /**
   * Ids of other pages in the Atlas this one connects to — the wiki's
   * "See also". A page may point at pages in a different collection.
   */
  related?: string[];
};

/**
 * A collection — a top-level section of the Atlas.
 *
 * `kind: 'entries'` collections hold pages, grouped. `kind: 'glossary'`
 * collections hold terms instead, which have their own page shape.
 */
export type AtlasCollection = {
  id: string;
  /** The full title, used on the collection's own page. */
  title: string;
  /** A short label, used in the rail and in "See also" chips. */
  short: string;
  /** One line: what this collection holds. */
  blurb: string;
  kind: 'entries' | 'glossary';
  /** The label on the primary button, e.g. `Open app` or `Visit project`. */
  primaryAction?: string;
  /** The collection's own introduction. */
  intro?: AtlasSection[];
  /** The groups of pages, for `kind: 'entries'` collections. */
  groups: AtlasGroup[];
  /** Highlighted blocks shown between the introduction and the directory. */
  highlights?: AtlasHighlight[];
  /**
   * Whether the pages in this collection carry a comment thread. Off by
   * default — a wiki opens its pages for discussion where it is wanted,
   * not everywhere.
   */
  comments?: boolean;
  /** The terms, for `kind: 'glossary'` collections. */
  terms?: AtlasGlossaryTerm[];
};

/** One glossary term. */
export type AtlasGlossaryTerm = {
  term: string;
  definition: string;
  /** Ids of pages in the Atlas where this term appears. */
  related?: string[];
};

/** One of the six questions the universe asks. */
export type AtlasQuestion = {
  /** WHERE, WHO, WHEN, WHY, WHAT or HOW. */
  mark: string;
  /** The question in a sentence. */
  text: string;
  /** The page that owns the answer. */
  entryId: string;
};

/**
 * A highlighted block on a collection's own page. A collection declares the
 * highlights that suit it, rather than the page deciding what every
 * collection should contain.
 */
export type AtlasHighlight = {
  id: string;
  title: string;
  blurb: string;
  /** The kind of block. Only one today; more can be added the same way. */
  kind: 'questions';
};

/**
 * A thread — a path through the wiki that crosses collections.
 *
 * Threads are the reason the Atlas is more than two lists side by side:
 * they show how a reference in the shelf and an application in the
 * universe are part of the same piece of work.
 */
export type AtlasThread = {
  id: string;
  title: string;
  blurb: string;
  /** Page ids, in order. */
  path: string[];
};
