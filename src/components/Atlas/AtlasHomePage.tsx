import React from 'react';
import Link from '@docusaurus/Link';
import {
  ATLAS_COLLECTIONS,
  ATLAS_ENTRIES,
  ATLAS_THREADS,
  AtlasEntry,
} from '../../data/atlas';
import AtlasShell from './AtlasShell';
import {collectionPath, entryPath, monogram} from './atlas-utils';
import styles from './atlas.module.css';

/**
 * The front door of the Atlas.
 *
 * It does three things: say what the Atlas is, list the collections it
 * holds, and show the threads — the paths that run through more than one
 * of them. The threads are the argument that this is one wiki rather than
 * several lists that happen to share a page.
 */
export default function AtlasHomePage(): React.JSX.Element {
  const glossaryTerms =
    ATLAS_COLLECTIONS.find((collection) => collection.kind === 'glossary')?.terms ??
    [];

  const toc = [
    {id: 'collections', label: 'The collections'},
    {id: 'threads', label: 'Threads'},
    {id: 'all-pages', label: 'All pages'},
  ];

  return (
    <AtlasShell
      title="WhereQ Atlas"
      description="The wiki of the WhereQ Universe — the applications, the references behind them, and the vocabulary they share."
      toc={toc}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <p className={styles.eyebrow}>The WhereQ Atlas</p>
        <h1 className={styles.heroTitle}>A wiki of the universe and its craft</h1>
        <p className={styles.heroSubtitle}>
          The WhereQ Universe is a family of applications built on one
          centralized data cloud. The Atlas is where they are written down —
          alongside the standards and tools they are built on, and the
          vocabulary they share.
        </p>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Pages</dt>
            <dd>{ATLAS_ENTRIES.length}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Collections</dt>
            <dd>{ATLAS_COLLECTIONS.length}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Threads</dt>
            <dd>{ATLAS_THREADS.length}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Terms</dt>
            <dd>{glossaryTerms.length}</dd>
          </div>
        </dl>
      </header>

      {/* ── The collections ───────────────────────────────────── */}
      <section className={styles.section} id="collections">
        <h2 className={styles.sectionTitle}>The collections</h2>
        <p className={styles.para}>
          Three collections, each with its own kind of page. The Universe is
          what WhereQ builds; the References shelf is what it is built from;
          the Glossary is the language the two use.
        </p>

        <div className={styles.collectionGrid}>
          {ATLAS_COLLECTIONS.map((collection) => (
            <article className={styles.collectionCard} key={collection.id}>
              <h3 className={styles.collectionTitle}>
                <Link to={collectionPath(collection.id)}>{collection.title}</Link>
              </h3>
              <p className={styles.collectionBlurb}>{collection.blurb}</p>
              <p className={styles.collectionMeta}>
                {collection.kind === 'glossary'
                  ? `${(collection.terms ?? []).length} terms`
                  : `${
                      collection.groups.reduce(
                        (sum, group) =>
                          sum +
                          ATLAS_ENTRIES.filter(
                            (entry) =>
                              entry.collection === collection.id &&
                              entry.group === group.id,
                          ).length,
                        0,
                      )
                    } pages in ${collection.groups.length} groups`}
              </p>
              <Link className={styles.btn} to={collectionPath(collection.id)}>
                Open {collection.short}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ── Threads ───────────────────────────────────────────── */}
      <section className={styles.section} id="threads">
        <h2 className={styles.sectionTitle}>Threads</h2>
        <p className={styles.para}>
          A wiki earns its keep when its pages connect. These are the paths
          that run through more than one collection — a reference and an
          application, two ends of the same piece of work.
        </p>

        <div className={styles.threadList}>
          {ATLAS_THREADS.map((thread) => (
            <article className={styles.thread} key={thread.id}>
              <h3 className={styles.threadTitle}>{thread.title}</h3>
              <p className={styles.threadBlurb}>{thread.blurb}</p>
              <ol className={styles.threadPath}>
                {thread.path.map((entryId, index) => {
                  const entry = byId(entryId);
                  return (
                    <li key={entryId} className={styles.threadStep}>
                      {index > 0 && (
                        <span className={styles.threadArrow} aria-hidden="true">
                          →
                        </span>
                      )}
                      <Link
                        className={styles.threadLink}
                        to={entryPath(entry.collection, entry.id)}>
                        {entry.logo ? (
                          <img className={styles.threadMark} src={entry.logo} alt="" />
                        ) : (
                          <span
                            className={styles.threadMonogram}
                            style={{color: entry.accent}}
                            aria-hidden="true">
                            {monogram(entry.name)}
                          </span>
                        )}
                        <span className={styles.threadName}>{entry.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {/* ── All pages ─────────────────────────────────────────── */}
      <section className={styles.section} id="all-pages">
        <h2 className={styles.sectionTitle}>All pages</h2>
        <p className={styles.para}>
          Every page in the Atlas, A to Z.
        </p>

        <div className={styles.indexGrid}>
          {byLetter().map(({letter, entries}) => (
            <div className={styles.indexLetter} key={letter}>
              <h3 className={styles.indexLetterHead}>{letter}</h3>
              <ul className={styles.indexList}>
                {entries.map((entry) => (
                  <li key={entry.id}>
                    <Link
                      className={styles.indexLink}
                      to={entryPath(entry.collection, entry.id)}>
                      {entry.name}
                    </Link>
                    <span className={styles.indexWhere}>
                      {ATLAS_COLLECTIONS.find(
                        (collection) => collection.id === entry.collection,
                      )?.short}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.pageFooter}>
        The Atlas is written in this repository and published with the rest of
        the site. Every fact on these pages comes from the project it
        describes — its own repository, its own live site, or its own
        documentation.
      </footer>
    </AtlasShell>
  );
}

/** Look a page up by id. */
function byId(id: string): AtlasEntry {
  const found = ATLAS_ENTRIES.find((entry) => entry.id === id);
  if (!found) {
    throw new Error(`Unknown Atlas page in a thread: ${id}`);
  }
  return found;
}

/** Every page, grouped by the first letter of its name. */
function byLetter(): {letter: string; entries: AtlasEntry[]}[] {
  const sorted = [...ATLAS_ENTRIES].sort((a, b) =>
    a.name.localeCompare(b.name, 'en'),
  );

  const groups: {letter: string; entries: AtlasEntry[]}[] = [];
  for (const entry of sorted) {
    const letter = entry.name.charAt(0).toUpperCase();
    const current = groups[groups.length - 1];
    if (current && current.letter === letter) {
      current.entries.push(entry);
    } else {
      groups.push({letter, entries: [entry]});
    }
  }
  return groups;
}
