import React from 'react';
import Link from '@docusaurus/Link';
import {ATLAS_COLLECTIONS, ATLAS_QUESTIONS, AtlasCollection} from '../../data/atlas';
import AtlasBlocks from './AtlasBlocks';
import AtlasShell from './AtlasShell';
import {entriesInGroup, entryById, entryPath, monogram, slugify} from './atlas-utils';
import styles from './atlas.module.css';

/**
 * A collection's own page: its introduction, its highlights, and the
 * directory of everything in it.
 *
 * The same component serves every collection — the Universe and the
 * References shelf are laid out the same way, because they are the same
 * kind of thing.
 */
export default function AtlasCollectionPage({
  collectionId,
}: {
  collectionId: string;
}): React.JSX.Element {
  const collection: AtlasCollection = ATLAS_COLLECTIONS.find(
    (candidate) => candidate.id === collectionId,
  )!;

  const toc = [
    ...(collection.intro ?? []).map((section) => ({
      id: slugify(section.title),
      label: section.title,
    })),
    ...(collection.highlights ?? []).map((highlight) => ({
      id: highlight.id,
      label: highlight.title,
    })),
    ...collection.groups.map((group) => ({id: group.id, label: group.title})),
  ];

  const pageCount = collection.kind === 'entries'
    ? collection.groups.reduce(
        (sum, group) => sum + entriesInGroup(collection.id, group.id).length,
        0,
      )
    : (collection.terms ?? []).length;

  return (
    <AtlasShell
      title={collection.title}
      description={collection.blurb}
      activeCollectionId={collection.id}
      toc={toc}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <p className={styles.eyebrow}>The WhereQ Atlas</p>
        <h1 className={styles.heroTitle}>{collection.title}</h1>
        <p className={styles.heroSubtitle}>{collection.blurb}</p>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Pages</dt>
            <dd>{pageCount}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Groups</dt>
            <dd>{collection.groups.length}</dd>
          </div>
          <div className={styles.stat}>
            <dt>In the Atlas</dt>
            <dd>
              {ATLAS_COLLECTIONS.length}
              <span className={styles.statMeta}>collections</span>
            </dd>
          </div>
        </dl>
      </header>

      {/* ── The introduction ──────────────────────────────────── */}
      {(collection.intro ?? []).map((section) => (
        <section className={styles.section} id={slugify(section.title)} key={section.title}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <AtlasBlocks blocks={section.blocks} />
        </section>
      ))}

      {/* ── Highlights ────────────────────────────────────────── */}
      {(collection.highlights ?? []).map((highlight) => (
        <section className={styles.section} id={highlight.id} key={highlight.id}>
          <h2 className={styles.sectionTitle}>{highlight.title}</h2>
          <p className={styles.para}>{highlight.blurb}</p>
          {highlight.kind === 'questions' && (
            <ul className={styles.questions}>
              {ATLAS_QUESTIONS.map((question) => {
                const owner = entryById(question.entryId);
                return (
                  <li className={styles.question} key={question.mark}>
                    <span className={styles.questionMark}>{question.mark}</span>
                    <span className={styles.questionText}>{question.text}</span>
                    <Link
                      className={styles.questionLink}
                      to={entryPath(owner.collection, owner.id)}>
                      {owner.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ))}

      {/* ── The directory ─────────────────────────────────────── */}
      <section className={styles.section} id="directory">
        <h2 className={styles.sectionTitle}>The directory</h2>
        <p className={styles.para}>
          Everything in this collection, grouped. Open one to read its full
          page in the Atlas.
        </p>
      </section>

      {collection.groups.map((group) => (
        <section className={styles.group} id={group.id} key={group.id}>
          <div className={styles.groupHead}>
            <h3 className={styles.groupTitle}>
              {group.title}
              <span className={styles.groupCount}>
                {entriesInGroup(collection.id, group.id).length}{' '}
                {entriesInGroup(collection.id, group.id).length === 1
                  ? 'page'
                  : 'pages'}
              </span>
            </h3>
            <p className={styles.groupBlurb}>{group.blurb}</p>
          </div>

          <div className={styles.cardGrid}>
            {entriesInGroup(collection.id, group.id).map((entry) => (
              <article
                className={styles.card}
                key={entry.id}
                style={{'--card-accent': entry.accent} as React.CSSProperties}>
                <div className={styles.cardHead}>
                  <span className={styles.cardMark}>
                    {entry.logo ? (
                      <img src={entry.logo} alt="" />
                    ) : (
                      <span className={styles.markMonogram} aria-hidden="true">
                        {monogram(entry.name)}
                      </span>
                    )}
                  </span>
                  <span>
                    <Link className={styles.cardName} to={entryPath(entry.collection, entry.id)}>
                      {entry.name}
                    </Link>
                    <span className={styles.cardRole}>{entry.role}</span>
                  </span>
                </div>
                <p className={styles.cardText}>{entry.summary}</p>
                <div className={styles.cardFoot}>
                  {entry.status && <span className={styles.chip}>{entry.status}</span>}
                  {entry.question && (
                    <span className={`${styles.chip} ${styles.chipAccent}`}>
                      {entry.question}
                    </span>
                  )}
                  {entry.url && (
                    <a
                      className={styles.btn}
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      {collection.primaryAction ?? 'Open'}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </AtlasShell>
  );
}
