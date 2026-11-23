import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {AtlasEntry} from '../../data/atlas-types';
import AtlasBlocks from '../Atlas/AtlasBlocks';
import GiscusComments from '../GiscusComments';
import styles from './dos-games.module.css';

/**
 * One game in the DOS games catalogue.
 *
 * The same shape as an Atlas page — header, facts, the body, the licence
 * notice, the comment thread — without the page tree beside it. A tree of
 * 1 898 games on every page would make every page eight times heavier than
 * it needs to be.
 */
export default function DosGamePage({entry}: {entry: AtlasEntry}): React.JSX.Element {
  return (
    <Layout
      title={`${entry.name} — DOS Games`}
      description={`${entry.name} — a DOS game in the WhereQ archive: the download, the setup in WhereQ-DOSBox, and what is known about how to play it.`}>
      <main className={styles.page}>
      <header className={styles.gameHeader}>
        <span className={styles.gameMark} style={{borderColor: entry.accent}}>
          <img src={`/img/dos-games/${entry.id}.svg`} alt="" />
        </span>
        <div className={styles.gameHeaderMain}>
          <p className={styles.gameRole}>{entry.role}</p>
          <h1 className={styles.gameName}>{entry.name}</h1>
          <p className={styles.gameTagline}>{entry.tagline}</p>
          <div className={styles.gameActions}>
            <a
              className={`${styles.btn} ${styles.btnPrimary}`}
              href={entry.url}
              target="_blank"
              rel="noopener noreferrer">
              Download the bundle
            </a>
            <Link className={styles.btn} to="/dos-games/">
              The whole catalogue
            </Link>
            <Link className={styles.btn} to="/atlas/dos-games/">
              The Atlas shelf
            </Link>
          </div>
        </div>
      </header>

      <aside className={styles.notice}>
        <p className={styles.noticeTitle}>About this download</p>
        <p className={styles.noticeText}>
          The archive on this page is published for study, communication and
          preservation only. It is the work of its authors and publishers,
          who hold the rights in it; publishing it here claims none of those
          rights and waives none of them. If you believe this download breaks
          a licence, a copyright or any other right, tell us and we will take
          it down.
        </p>
      </aside>

      <div className={styles.infobox}>
        <p className={styles.infoboxTitle}>{entry.name} at a glance</p>
        <div className={styles.infoboxBody}>
          {(entry.facts ?? []).map((fact) => (
            <div className={styles.infoboxRow} key={fact.label}>
              <div className={styles.infoboxTerm}>{fact.label}</div>
              <div className={styles.infoboxDesc}>{fact.value}</div>
            </div>
          ))}
        </div>
      </div>

      {entry.sections.map((section) => (
        <section className={styles.section} key={section.title}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <AtlasBlocks blocks={section.blocks} />
        </section>
      ))}

      <section className={styles.comments}>
        <h2 className={styles.sectionTitle}>Comments</h2>
        <p className={styles.para}>
          Got this one running where the page could not? Say what you did in
          the comments — the next reader will thank you.
        </p>
        <GiscusComments />
      </section>
      </main>
    </Layout>
  );
}
