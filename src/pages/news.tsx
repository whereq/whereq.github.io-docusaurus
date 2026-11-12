import React, { useEffect, useRef, useState } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import { ANNOUNCEMENT_COUNT, AppCategory, Announcement, NEWS_SECTIONS } from '../data/news';
import styles from './news.module.css';

/**
 * `2026-11-08` → `Nov 8, 2026`.
 *
 * The locale is pinned so the server-rendered markup and the hydrated
 * client markup are byte-identical — a mismatch would trip React's
 * hydration check.
 */
function formatDate(value: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return value;
  }
  const [, year, month, day] = match;
  const label = new Date(Number(year), Number(month) - 1, 1).toLocaleString(
    'en-US',
    {month: 'short'},
  );
  return `${label} ${Number(day)}, ${year}`;
}

/** An in-site path renders as a Link; anything else as a plain anchor. */
function ArticleLink({url, children}: {url: string; children: React.ReactNode}) {
  if (url.startsWith('/')) {
    return <Link to={url}>{children}</Link>;
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function AppLogo({app, size}: {app: AppCategory; size: number}) {
  return (
    <span
      className={styles.logoTile}
      style={{width: size, height: size}}
      aria-hidden="true">
      <img src={app.logo} alt="" className={styles.logo} width={size} height={size} />
    </span>
  );
}

function AnnouncementTable({app}: {app: AppCategory}) {
  if (app.announcements.length === 0) {
    return (
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Announcement</th>
              <th scope="col" className={styles.dateCol}>
                Published
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className={styles.emptyCell}>
                No announcements yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Announcement</th>
            <th scope="col" className={styles.dateCol}>
              Published
            </th>
          </tr>
        </thead>
        <tbody>
          {app.announcements.map((announcement: Announcement) => (
            <tr key={`${app.id}-${announcement.url}-${announcement.date}`}>
              <td className={styles.title}>
                <ArticleLink url={announcement.url}>{announcement.title}</ArticleLink>
              </td>
              <td className={styles.dateCol}>
                <time dateTime={announcement.date}>{formatDate(announcement.date)}</time>
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
    <section className={styles.app} aria-labelledby={app.id}>
      <h3 className={styles.appHeading} id={app.id}>
        <AppLogo app={app} size={44} />
        <span className={styles.appHeadingMain}>
          <span className={styles.appNameRow}>
            <span className={styles.appName}>
              {app.name}
              <a
                className={styles.anchor}
                href={`#${app.id}`}
                aria-label={`Permalink to ${app.name}`}>
                #
              </a>
            </span>
            <span className={styles.appLinks}>
              {app.url && (
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.appLink} ${styles.appLinkPrimary}`}>
                  Open app
                </a>
              )}
              {app.repo && (
                <a
                  href={`https://github.com/whereq/${app.repo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.appLink}>
                  Source
                </a>
              )}
            </span>
          </span>
          <span className={styles.appTagline}>{app.tagline}</span>
        </span>
      </h3>
      <AnnouncementTable app={app} />
    </section>
  );
}

export default function News(): React.JSX.Element {
  const appIds = NEWS_SECTIONS.flatMap((section) => section.apps.map((app) => app.id));
  const [activeId, setActiveId] = useState(appIds[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

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

    appIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observerRef.current?.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, [appIds.join(',')]);

  const appCount = NEWS_SECTIONS.reduce((sum, section) => sum + section.apps.length, 0);

  return (
    <Layout
      title="News"
      description="Announcements across the WhereQ Universe — every application, newest first.">
      <main className={styles.layout}>
        <div className={styles.content}>
          {/* ── Hero ─────────────────────────────────────────── */}
          <header className={styles.hero}>
            <p className={styles.eyebrow}>WhereQ Universe</p>
            <h1 className={styles.heroTitle}>News</h1>
            <p className={styles.heroSubtitle}>
              What shipped across the universe, written up as announcements —
              one article per release, with the date it was published.
            </p>

            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt>Applications</dt>
                <dd>{appCount}</dd>
              </div>
              <div className={styles.stat}>
                <dt>Open source</dt>
                <dd>
                  {NEWS_SECTIONS[0].apps.length}
                  <span className={styles.statMeta}>of {appCount}</span>
                </dd>
              </div>
              <div className={styles.stat}>
                <dt>Announcements</dt>
                <dd>{ANNOUNCEMENT_COUNT}</dd>
              </div>
            </dl>
          </header>

          {/* ── Sections ─────────────────────────────────────── */}
          {NEWS_SECTIONS.map((section) => (
            <section className={styles.section} key={section.id} aria-labelledby={section.id}>
              <h2 className={styles.sectionTitle} id={section.id}>
                {section.title}
              </h2>
              <p className={styles.sectionBlurb}>{section.blurb}</p>
              {section.apps.map((app) => (
                <AppSection key={app.id} app={app} />
              ))}
            </section>
          ))}

          <footer className={styles.pageFooter}>
            Announcements are written here, in the WhereQ docs hub. Each one
            describes what an application shipped — the release tags and the
            commit history stay in the application&rsquo;s own repository.
          </footer>
        </div>

        {/* ── TOC sidebar ────────────────────────────────────── */}
        <aside className={styles.tocAside}>
          <nav className={styles.toc}>
            <p className={styles.tocTitle}>Applications</p>
            {NEWS_SECTIONS.map((section) => (
              <div className={styles.tocGroup} key={section.id}>
                <p className={styles.tocGroupTitle}>{section.title}</p>
                <ul className={styles.tocList}>
                  {section.apps.map((app) => (
                    <li key={app.id}>
                      <a
                        href={`#${app.id}`}
                        className={`${styles.tocLink} ${
                          activeId === app.id ? styles.tocLinkActive : ''
                        }`}>
                        <AppLogo app={app} size={18} />
                        <span className={styles.tocLabel}>{app.name}</span>
                        {app.announcements.length > 0 && (
                          <span className={styles.tocCount}>{app.announcements.length}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
      </main>
    </Layout>
  );
}
