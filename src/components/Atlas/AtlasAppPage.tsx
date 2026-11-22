import React from 'react';
import Link from '@docusaurus/Link';
import {ATLAS_APPS, AtlasApp} from '../../data/atlas';
import AtlasBlocks from './AtlasBlocks';
import AtlasShell from './AtlasShell';
import {appById, appPath, groupById, repoUrl, slugify} from './atlas-utils';
import styles from './atlas.module.css';

/**
 * One application, one page. The shape is fixed for every application:
 *
 *   What it is → What it does → How it fits the universe → Under the hood
 *
 * so a reader always knows where to look.
 */
export default function AtlasAppPage({appId}: {appId: string}): React.JSX.Element {
  const app: AtlasApp = appById(appId);
  const group = groupById(app.group);

  const toc = app.sections.map((section) => ({
    id: slugify(section.title),
    label: section.title,
  }));

  // The next application in the atlas, so a reader who liked this one has
  // somewhere to go next.
  const position = ATLAS_APPS.findIndex((entry) => entry.id === app.id);
  const next = ATLAS_APPS[(position + 1) % ATLAS_APPS.length];

  return (
    <AtlasShell
      title={app.name}
      description={`${app.role} — ${app.tagline}`}
      activeAppId={app.id}
      toc={toc}>
      {/* ── Header ────────────────────────────────────────────── */}
      <header className={styles.appHeader}>
        <span className={styles.appMark} style={{borderColor: app.accent}}>
          <img src={app.logo} alt="" />
        </span>
        <div className={styles.appHeaderMain}>
          <p className={styles.appRole}>{app.role}</p>
          <h1 className={styles.appName}>{app.name}</h1>
          <p className={styles.appTagline}>{app.tagline}</p>
          <div className={styles.appActions}>
            {app.url && (
              <a
                className={`${styles.btn} ${styles.btnPrimary}`}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer">
                Open app
              </a>
            )}
            {app.repo && (
              <a
                className={styles.btn}
                href={repoUrl(app.repo)}
                target="_blank"
                rel="noopener noreferrer">
                Source
              </a>
            )}
            {(app.links ?? []).map((link) => (
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

      {/* ── The summary card ──────────────────────────────────── */}
      <div className={styles.infobox}>
        <p className={styles.infoboxTitle}>{app.name} at a glance</p>
        <div className={styles.infoboxBody}>
          <div className={styles.infoboxRow}>
            <div className={styles.infoboxTerm}>Role</div>
            <div className={styles.infoboxDesc}>{app.role}</div>
          </div>
          <div className={styles.infoboxRow}>
            <div className={styles.infoboxTerm}>Domain</div>
            <div className={styles.infoboxDesc}>{group.title}</div>
          </div>
          <div className={styles.infoboxRow}>
            <div className={styles.infoboxTerm}>Status</div>
            <div className={styles.infoboxDesc}>{app.status}</div>
          </div>
          {app.question && (
            <div className={styles.infoboxRow}>
              <div className={styles.infoboxTerm}>Answers</div>
              <div className={styles.infoboxDesc}>{app.question}</div>
            </div>
          )}
          <div className={styles.infoboxRow}>
            <div className={styles.infoboxTerm}>What it does</div>
            <div className={styles.infoboxDesc}>
              <ul>
                {app.capabilities.map((capability, index) => (
                  <li key={index}>{capability}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.infoboxRow}>
            <div className={styles.infoboxTerm}>Go to</div>
            <div className={styles.infoboxDesc}>
              <div className={styles.infoboxLinks}>
                {app.url && (
                  <a
                    className={styles.btn}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer">
                    Open app
                  </a>
                )}
                {app.repo && (
                  <a
                    className={styles.btn}
                    href={repoUrl(app.repo)}
                    target="_blank"
                    rel="noopener noreferrer">
                    Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── The body ──────────────────────────────────────────── */}
      {app.sections.map((section) => (
        <section className={styles.section} id={slugify(section.title)} key={section.title}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <AtlasBlocks blocks={section.blocks} />
        </section>
      ))}

      {/* ── Where to go next ──────────────────────────────────── */}
      <footer className={styles.pageFooter}>
        <p>
          <Link to="/atlas/">← Back to the Atlas overview</Link>
          {' · '}
          Next:{' '}
          <Link to={appPath(next.id)}>{next.name}</Link>
        </p>
      </footer>
    </AtlasShell>
  );
}
