import React from 'react';
import Link from '@docusaurus/Link';
import {
  ATLAS_APPS,
  ATLAS_GROUPS,
  ATLAS_QUESTIONS,
  ATLAS_UNIVERSE,
} from '../../data/atlas';
import AtlasBlocks from './AtlasBlocks';
import AtlasShell from './AtlasShell';
import {appById, appPath, appsInGroup, slugify} from './atlas-utils';
import styles from './atlas.module.css';

/**
 * The opening of the Atlas: what the WhereQ Universe is, the six questions
 * it asks, and the directory of every application in it.
 */
export default function AtlasIndexPage(): React.JSX.Element {
  const publicSourceCount = ATLAS_APPS.filter((app) => app.repo).length;

  const toc = [
    ...ATLAS_UNIVERSE.sections.map((section) => ({
      id: slugify(section.title),
      label: section.title,
    })),
    {id: 'the-six-questions', label: 'The six questions'},
    ...ATLAS_GROUPS.map((group) => ({id: group.id, label: group.title})),
  ];

  return (
    <AtlasShell
      title="WhereQ Atlas"
      description="The wiki of the WhereQ Universe — one page for every application in it."
      toc={toc}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <p className={styles.eyebrow}>WhereQ Universe</p>
        <h1 className={styles.heroTitle}>WhereQ Atlas</h1>
        <p className={styles.heroSubtitle}>{ATLAS_UNIVERSE.standfirst}</p>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Applications</dt>
            <dd>{ATLAS_APPS.length}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Domains</dt>
            <dd>{ATLAS_GROUPS.length}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Public source</dt>
            <dd>
              {publicSourceCount}
              <span className={styles.statMeta}>repositories</span>
            </dd>
          </div>
          <div className={styles.stat}>
            <dt>Questions</dt>
            <dd>{ATLAS_QUESTIONS.length}</dd>
          </div>
        </dl>
      </header>

      {/* ── The introduction ──────────────────────────────────── */}
      {ATLAS_UNIVERSE.sections.map((section) => (
        <section className={styles.section} id={slugify(section.title)} key={section.title}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <AtlasBlocks blocks={section.blocks} />
        </section>
      ))}

      {/* ── The six questions ─────────────────────────────────── */}
      <section className={styles.section} id="the-six-questions">
        <h2 className={styles.sectionTitle}>The six questions</h2>
        <p className={styles.para}>
          Every application in the universe answers one of six questions. The
          ones below are the owners — the application whose whole job is to
          answer that question for everything else.
        </p>
        <ul className={styles.questions}>
          {ATLAS_QUESTIONS.map((question) => {
            const owner = appById(question.appId);
            return (
              <li className={styles.question} key={question.mark}>
                <span className={styles.questionMark}>{question.mark}</span>
                <span className={styles.questionText}>{question.text}</span>
                <Link className={styles.questionLink} to={appPath(owner.id)}>
                  {owner.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── The directory ─────────────────────────────────────── */}
      <section className={styles.section} id="directory">
        <h2 className={styles.sectionTitle}>The directory</h2>
        <p className={styles.para}>
          Every application, grouped by the domain it belongs to. Open one to
          read its full page in the Atlas.
        </p>
      </section>

      {ATLAS_GROUPS.map((group) => (
        <section className={styles.group} id={group.id} key={group.id}>
          <div className={styles.groupHead}>
            <h3 className={styles.groupTitle}>
              {group.title}
              <span className={styles.groupCount}>
                {appsInGroup(group.id).length} application
                {appsInGroup(group.id).length === 1 ? '' : 's'}
              </span>
            </h3>
            <p className={styles.groupBlurb}>{group.blurb}</p>
          </div>

          <div className={styles.cardGrid}>
            {appsInGroup(group.id).map((app) => (
              <article
                className={styles.card}
                key={app.id}
                style={{'--card-accent': app.accent} as React.CSSProperties}>
                <div className={styles.cardHead}>
                  <span className={styles.cardMark}>
                    <img src={app.logo} alt="" />
                  </span>
                  <span>
                    <Link className={styles.cardName} to={appPath(app.id)}>
                      {app.name}
                    </Link>
                    <span className={styles.cardRole}>{app.role}</span>
                  </span>
                </div>
                <p className={styles.cardText}>{app.summary}</p>
                <div className={styles.cardFoot}>
                  <span className={styles.chip}>{app.status}</span>
                  {app.question && (
                    <span className={`${styles.chip} ${styles.chipAccent}`}>
                      {app.question}
                    </span>
                  )}
                  {app.url && (
                    <a
                      className={styles.btn}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      Open
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <footer className={styles.pageFooter}>
        The Atlas is written in this repository and published with the rest of
        the site. Every fact on these pages comes from the application it
        describes — its own repository, its own live site, or the universe
        map in whereq.ca.
      </footer>
    </AtlasShell>
  );
}
