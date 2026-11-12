import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import { NEWS_SECTIONS, AppCategory, Release } from '../data/news';
import styles from './news.module.css';

/**
 * `2026-11-08` → `Nov 8, 2026`; `2026-11` → `Nov 2026`.
 *
 * The locale is pinned so the server-rendered markup and the hydrated
 * client markup are byte-identical — a mismatch would trip React's
 * hydration check.
 */
function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(value);
  if (!match) {
    return value;
  }
  const [, year, month, day] = match;
  const label = new Date(Number(year), Number(month) - 1, 1).toLocaleString(
    'en-US',
    {month: 'short'},
  );
  return day ? `${label} ${Number(day)}, ${year}` : `${label} ${year}`;
}

function AppLogo({app, size}: {app: AppCategory; size: number}) {
  return (
    <span
      className={styles.logoTile}
      style={{width: size, height: size, borderRadius: Math.round(size * 0.22)}}
      aria-hidden="true">
      <img src={app.logo} alt="" className={styles.logo} width={size} height={size} />
    </span>
  );
}

function ReleaseTable({app}: {app: AppCategory}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Release</th>
            <th scope="col" className={styles.dateCol}>
              Released
            </th>
          </tr>
        </thead>
        <tbody>
          {app.releases.map((release: Release) => (
            <tr key={`${app.id}-${release.version}-${release.date}-${release.title}`}>
              <td>
                <span className={styles.row}>
                  <span className={styles.version}>{release.version}</span>
                  <span className={styles.title}>
                    {release.url ? (
                      <a href={release.url} target="_blank" rel="noopener noreferrer">
                        {release.title}
                      </a>
                    ) : (
                      release.title
                    )}
                  </span>
                </span>
              </td>
              <td className={styles.dateCol}>
                <time dateTime={release.date}>{formatDate(release.date)}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AppSection({app}: {app: AppCategory}) {
  return (
    <section className={styles.section} aria-labelledby={app.id}>
      <h2 className={styles.appHeading} id={app.id}>
        <AppLogo app={app} size={44} />
        <span className={styles.appHeadingText}>
          <span className={styles.appName}>
            {app.name}
            <a
              className={styles.anchor}
              href={`#${app.id}`}
              aria-label={`Permalink to ${app.name}`}>
              #
            </a>
          </span>
          <span className={styles.appTagline}>{app.tagline}</span>
        </span>
        <span className={styles.appLinks}>
          <a href={app.url} target="_blank" rel="noopener noreferrer" className={styles.appLink}>
            Open app
          </a>
          <a
            href={`https://github.com/whereq/${app.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.appLink}>
            Source
          </a>
        </span>
      </h2>
      <ReleaseTable app={app} />
    </section>
  );
}

export default function News(): React.JSX.Element {
  const [activeId, setActiveId] = useState(NEWS_SECTIONS[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  const totalReleases = useMemo(
    () => NEWS_SECTIONS.reduce((sum, app) => sum + app.releases.length, 0),
    [],
  );

  const latest = useMemo(() => {
    let newest: {app: AppCategory; release: Release} | undefined;
    for (const app of NEWS_SECTIONS) {
      const release = app.releases[0];
      if (release && (!newest || release.date > newest.release.date)) {
        newest = {app, release};
      }
    }
    return newest;
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {rootMargin: '-15% 0px -75% 0px'},
    );

    NEWS_SECTIONS.forEach(({id}) => {
      const el = document.getElementById(id);
      if (el) {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <Layout
      title="News"
      description="Release announcements across the WhereQ Universe — every application, newest first.">
      <main className={styles.layout}>
        <div className={styles.content}>
          {/* ── Hero ─────────────────────────────────────────── */}
          <header className={styles.hero}>
            <p className={styles.eyebrow}>WhereQ Universe</p>
            <h1 className={styles.heroTitle}>News</h1>
            <p className={styles.heroSubtitle}>
              Release announcements from every application in the universe —
              what shipped, and when. Each entry is the application&rsquo;s own
              release note, read straight from its repository.
            </p>

            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt>Applications</dt>
                <dd>{NEWS_SECTIONS.length}</dd>
              </div>
              <div className={styles.stat}>
                <dt>Release notes</dt>
                <dd>{totalReleases}</dd>
              </div>
              {latest && (
                <div className={styles.stat}>
                  <dt>Most recent</dt>
                  <dd>
                    <a href={`#${latest.app.id}`}>{latest.release.version}</a>
                    <span className={styles.statMeta}>{formatDate(latest.release.date)}</span>
                  </dd>
                </div>
              )}
            </dl>
          </header>

          {/* ── Categories ───────────────────────────────────── */}
          {NEWS_SECTIONS.map((app) => (
            <AppSection key={app.id} app={app} />
          ))}

          <footer className={styles.pageFooter}>
            Release notes are collected from each application&rsquo;s repository —
            the version, the date and the wording are the application&rsquo;s own.
          </footer>
        </div>

        {/* ── TOC sidebar ────────────────────────────────────── */}
        <aside className={styles.tocAside}>
          <nav className={styles.toc}>
            <p className={styles.tocTitle}>Applications</p>
            <ul className={styles.tocList}>
              {NEWS_SECTIONS.map((app) => (
                <li key={app.id}>
                  <a
                    href={`#${app.id}`}
                    className={`${styles.tocLink} ${
                      activeId === app.id ? styles.tocLinkActive : ''
                    }`}>
                    <AppLogo app={app} size={18} />
                    <span className={styles.tocLabel}>{app.name}</span>
                    <span className={styles.tocCount}>{app.releases.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </main>
    </Layout>
  );
}
