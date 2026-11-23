import React from 'react';
import Link from '@docusaurus/Link';
import {AtlasEntry} from '../../data/atlas';
import AtlasBlocks from './AtlasBlocks';
import AtlasShell from './AtlasShell';
import GiscusComments from '../GiscusComments';
import {
  collectionById,
  entriesInCollection,
  entryById,
  entryPath,
  groupById,
  monogram,
  repoUrl,
  slugify,
} from './atlas-utils';
import styles from './atlas.module.css';

/**
 * One page in the Atlas. The shape is the same everywhere — what it is,
 * what it does, how it works, what is under the hood — so a reader always
 * knows where to look, whether the page is about an application or about a
 * piece of software somebody else wrote.
 */
export default function AtlasEntryPage({
  collectionId,
  entryId,
}: {
  collectionId: string;
  entryId: string;
}): React.JSX.Element {
  const entry: AtlasEntry = entryById(entryId);
  const collection = collectionById(collectionId);
  const group = groupById(collection.id, entry.group);

  const toc = entry.sections.map((section) => ({
    id: slugify(section.title),
    label: section.title,
  }));

  // The next page in the same collection, so a reader who liked this one
  // has somewhere to go next.
  const next = nextInCollection(collectionId, entryId);

  const primaryLabel = collection.primaryAction ?? 'Open';

  return (
    <AtlasShell
      title={entry.name}
      description={`${entry.role} — ${entry.tagline}`}
      activeCollectionId={collection.id}
      activeEntryId={entry.id}
      toc={toc}>
      {/* ── Header ────────────────────────────────────────────── */}
      <header className={styles.appHeader}>
        <span className={styles.appMark} style={{borderColor: entry.accent}}>
          {entry.logo ? (
            <img src={entry.logo} alt="" />
          ) : (
            <span className={styles.markMonogram} aria-hidden="true">
              {monogram(entry.name)}
            </span>
          )}
        </span>
        <div className={styles.appHeaderMain}>
          <p className={styles.appRole}>
            <span className={styles.appCollection}>{collection.short}</span>
            {entry.role}
          </p>
          <h1 className={styles.appName}>{entry.name}</h1>
          <p className={styles.appTagline}>{entry.tagline}</p>
          <div className={styles.appActions}>
            {entry.url && (
              <a
                className={`${styles.btn} ${styles.btnPrimary}`}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer">
                {primaryLabel}
              </a>
            )}
            {entry.repo && (
              <a
                className={styles.btn}
                href={repoUrl(entry.repo)}
                target="_blank"
                rel="noopener noreferrer">
                Source
              </a>
            )}
            {(entry.links ?? []).map((link) => (
              <a
                className={`${styles.btn} ${styles.btnGhost}`}
                key={link.href}
                href={link.href}
                target={link.external === false ? undefined : '_blank'}
                rel={link.external === false ? undefined : 'noopener noreferrer'}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ── The notice a page has to carry ───────────────────── */}
      {entry.notice && (
        <aside className={styles.notice}>
          <p className={styles.noticeTitle}>{entry.notice.title}</p>
          <p className={styles.noticeText}>{entry.notice.text}</p>
        </aside>
      )}

      {/* ── The summary card ──────────────────────────────────── */}
      <div className={styles.infobox}>
        <p className={styles.infoboxTitle}>{entry.name} at a glance</p>
        <div className={styles.infoboxBody}>
          <div className={styles.infoboxRow}>
            <div className={styles.infoboxTerm}>Role</div>
            <div className={styles.infoboxDesc}>{entry.role}</div>
          </div>
          <div className={styles.infoboxRow}>
            <div className={styles.infoboxTerm}>Collection</div>
            <div className={styles.infoboxDesc}>
              <Link to={`/atlas/${collection.id}/`}>{collection.title}</Link>
            </div>
          </div>
          {collection.kind === 'entries' && (
            <div className={styles.infoboxRow}>
              <div className={styles.infoboxTerm}>Domain</div>
              <div className={styles.infoboxDesc}>{group.title}</div>
            </div>
          )}
          {(entry.facts ?? []).map((fact) => (
            <div className={styles.infoboxRow} key={fact.label}>
              <div className={styles.infoboxTerm}>{fact.label}</div>
              <div className={styles.infoboxDesc}>{fact.value}</div>
            </div>
          ))}
          {entry.status && (
            <div className={styles.infoboxRow}>
              <div className={styles.infoboxTerm}>Status</div>
              <div className={styles.infoboxDesc}>{entry.status}</div>
            </div>
          )}
          {entry.question && (
            <div className={styles.infoboxRow}>
              <div className={styles.infoboxTerm}>Answers</div>
              <div className={styles.infoboxDesc}>{entry.question}</div>
            </div>
          )}
          {entry.capabilities && entry.capabilities.length > 0 && (
            <div className={styles.infoboxRow}>
              <div className={styles.infoboxTerm}>What it does</div>
              <div className={styles.infoboxDesc}>
                <ul>
                  {entry.capabilities.map((capability, index) => (
                    <li key={index}>{capability}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {entry.related && entry.related.length > 0 && (
            <div className={styles.infoboxRow}>
              <div className={styles.infoboxTerm}>See also</div>
              <div className={styles.infoboxDesc}>
                <SeeAlso ids={entry.related} />
              </div>
            </div>
          )}
          {(entry.url || entry.repo) && (
            <div className={styles.infoboxRow}>
              <div className={styles.infoboxTerm}>Go to</div>
              <div className={styles.infoboxDesc}>
                <div className={styles.infoboxLinks}>
                  {entry.url && (
                    <a
                      className={styles.btn}
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      {primaryLabel}
                    </a>
                  )}
                  {entry.repo && (
                    <a
                      className={styles.btn}
                      href={repoUrl(entry.repo)}
                      target="_blank"
                      rel="noopener noreferrer">
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── The body ──────────────────────────────────────────── */}
      {entry.sections.map((section) => (
        <section className={styles.section} id={slugify(section.title)} key={section.title}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <AtlasBlocks blocks={section.blocks} />
        </section>
      ))}

      {/* ── Where to go next ──────────────────────────────────── */}
      <footer className={styles.pageFooter}>
        <p>
          <Link to={`/atlas/${collection.id}/`}>← Back to {collection.title}</Link>
          {next && (
            <>
              {' · '}
              Next:{' '}
              <Link to={entryPath(collection.id, next.id)}>{next.name}</Link>
            </>
          )}
        </p>
      </footer>

      {/* ── The comment thread ────────────────────────────────── */}
      {collection.comments && (
        <section className={styles.comments} id="comments">
          <h2 className={styles.sectionTitle}>Comments</h2>
          <p className={styles.para}>
            Got a step that does not work on your device, or a shorter way in?
            Say so here — the next reader will thank you.
          </p>
          <GiscusComments />
        </section>
      )}
    </AtlasShell>
  );
}

/** The "See also" chips — other pages in the Atlas this one connects to. */
function SeeAlso({ids}: {ids: string[]}) {
  return (
    <ul className={styles.seeAlso}>
      {ids.map((id) => {
        const related = entryById(id);
        const collection = collectionById(related.collection);
        return (
          <li key={id}>
            <Link className={styles.seeAlsoLink} to={entryPath(related.collection, id)}>
              <span
                className={styles.seeAlsoDot}
                style={{background: related.accent}}
                aria-hidden="true"
              />
              <span className={styles.seeAlsoName}>{related.name}</span>
              <span className={styles.seeAlsoWhere}>{collection.short}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** The next page in the same collection, wrapping round at the end. */
function nextInCollection(collectionId: string, entryId: string): AtlasEntry | null {
  const entries = entriesInCollection(collectionId);
  if (entries.length === 0) {
    return null;
  }
  const position = entries.findIndex((entry) => entry.id === entryId);
  if (position < 0) {
    return null;
  }
  return entries[(position + 1) % entries.length];
}
