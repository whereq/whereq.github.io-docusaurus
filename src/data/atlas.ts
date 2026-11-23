/**
 * WhereQ Atlas — the wiki of the WhereQ Universe and the craft behind it.
 *
 * The Atlas is not a directory of applications. It is a wiki with three
 * collections:
 *
 *   · The WhereQ Universe — every application, one page each
 *   · The References shelf — the standards and tools the work is built on
 *   · The Glossary — the vocabulary, defined once
 *
 * and threads that cross between them, because a reference in the shelf and
 * an application in the universe are usually two ends of the same piece of
 * work.
 *
 * Content lives in the collection modules; this file only assembles them.
 * The layout lives in `src/components/Atlas/`.
 */

import {
  AtlasCollection,
  AtlasEntry,
  AtlasQuestion,
  AtlasSection,
  AtlasThread,
} from './atlas-types';
import {UNIVERSE_ENTRIES, UNIVERSE_GROUPS, UNIVERSE_INTRO, UNIVERSE_QUESTIONS} from './atlas-universe';
import {RESOURCE_ENTRIES, RESOURCE_GROUPS} from './atlas-resources';
import {GLOSSARY_TERMS} from './atlas-glossary';

export * from './atlas-types';
export {UNIVERSE_ENTRIES, UNIVERSE_GROUPS, UNIVERSE_INTRO, UNIVERSE_QUESTIONS} from './atlas-universe';
export {RESOURCE_ENTRIES, RESOURCE_GROUPS} from './atlas-resources';
export {GLOSSARY_TERMS} from './atlas-glossary';

/** The introduction to the References shelf. */
const RESOURCES_INTRO: AtlasSection[] = [
  {
    title: 'What this shelf is',
    blocks: [
      {
        kind: 'paragraph',
        text: 'A shelf of references: the protocols, frameworks, formats and runtimes that the work in this Atlas is actually built on, written so that each one stands on its own.',
      },
      {
        kind: 'paragraph',
        text: 'None of them belong to the WhereQ Universe. They are not products of it and they do not depend on it. What makes them worth a page is that they are the tools the universe is made of — and that the explanations here are the ones the author actually works from, not summaries written from memory.',
      },
      {
        kind: 'paragraph',
        text: 'Every page states where it came from. Versions and dates were checked against the project\'s own documentation, and each page links back to the primary source so the reader can check the claim rather than take it.',
      },
    ],
  },
  {
    title: 'How to read a reference',
    blocks: [
      {
        kind: 'paragraph',
        text: 'Each page has the same shape: what it is, how it works, what is under the hood, and where to read more. The first three are the explanation; the last is the escape hatch to the primary source, and usually the place where the project\'s own deep dives live.',
      },
      {
        kind: 'paragraph',
        text: 'Where a reference genuinely connects to a page in the Universe, that link appears under "See also". Nothing is linked on the strength of a hunch — if the relationship is not stated in one of the two projects\' own material, it is not claimed here.',
      },
    ],
  },
];

/** Every collection in the Atlas, in the order they appear in the rail. */
export const ATLAS_COLLECTIONS: AtlasCollection[] = [
  {
    id: 'universe',
    title: 'The WhereQ Universe',
    short: 'Universe',
    blurb:
      'Every application in the universe, one page each — what it is, what it does, and how it fits.',
    kind: 'entries',
    primaryAction: 'Open app',
    intro: UNIVERSE_INTRO.sections,
    groups: UNIVERSE_GROUPS,
    highlights: [
      {
        id: 'the-six-questions',
        title: 'The six questions',
        blurb:
          'Every application in the universe answers one of six questions. The ones below are the owners — the application whose whole job is to answer that question for everything else.',
        kind: 'questions',
      },
    ],
  },
  {
    id: 'resources',
    title: 'The References Shelf',
    short: 'References',
    blurb:
      'The standards, frameworks, formats and runtimes the work is built on — each written to stand alone.',
    kind: 'entries',
    primaryAction: 'Visit project',
    intro: RESOURCES_INTRO,
    groups: RESOURCE_GROUPS,
  },
  {
    id: 'glossary',
    title: 'The Glossary',
    short: 'Glossary',
    blurb:
      'The vocabulary of the Atlas, defined once — and linked to the pages where each term turns up.',
    kind: 'glossary',
    groups: [],
    terms: GLOSSARY_TERMS,
  },
];

/** Every page in the Atlas, from every collection. */
export const ATLAS_ENTRIES: AtlasEntry[] = [...UNIVERSE_ENTRIES, ...RESOURCE_ENTRIES];

/** The six questions the universe asks, and the page that owns each one. */
export const ATLAS_QUESTIONS: AtlasQuestion[] = UNIVERSE_QUESTIONS;

/**
 * Threads — paths through the wiki that cross between collections.
 *
 * These are the connective tissue. A thread is only recorded where the
 * relationship is stated by one of the projects involved.
 */
export const ATLAS_THREADS: AtlasThread[] = [
  {
    id: 'data-spine',
    title: 'The data spine',
    blurb:
      'One database, one schema, and two products reading the same contract — the reason the universe can correct a fact once instead of six times.',
    path: ['whereq-cloud', 'postgresql', 'caijing'],
  },
  {
    id: 'agent-surface',
    title: 'The agent surface',
    blurb:
      'The protocol lets an agent ask the data platform for what it needs, and the market desk reads what the same platform publishes.',
    path: ['mcp', 'whereq-cloud', 'flowdesk'],
  },
  {
    id: 'interface-layer',
    title: 'How this site is built',
    blurb:
      'The types, the library and the framework — and the voice they publish through.',
    path: ['typescript', 'react', 'docusaurus', 'whereq-hub'],
  },
  {
    id: 'streaming-layer',
    title: 'The streaming layer',
    blurb:
      'Events arrive as Avro records on Kafka, land as Parquet, and are computed over by Spark.',
    path: ['kafka', 'avro-parquet', 'spark'],
  },
];
