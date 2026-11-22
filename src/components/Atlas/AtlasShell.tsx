import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ATLAS_GROUPS} from '../../data/atlas';
import {appPath, appsInGroup} from './atlas-utils';
import styles from './atlas.module.css';

/** One entry in the "On this page" list. */
export type AtlasTocItem = {
  id: string;
  label: string;
};

type AtlasShellProps = {
  /** The document title — the site name is appended by the theme. */
  title: string;
  description: string;
  /** The application whose page is open, when one is. */
  activeAppId?: string;
  /** The sections of the open page, for the "On this page" list. */
  toc?: AtlasTocItem[];
  children: React.ReactNode;
};

/**
 * The shell every Atlas page sits in: the page tree on the left, the
 * article in the middle, and "On this page" on the right.
 *
 * Below 1200px the right rail folds into a disclosure at the top of the
 * article. Below 996px the left rail becomes a horizontal strip, so it
 * stays one line tall on a phone instead of pushing the article down.
 */
export default function AtlasShell({
  title,
  description,
  activeAppId,
  toc = [],
  children,
}: AtlasShellProps): React.JSX.Element {
  const [activeSection, setActiveSection] = useState('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (toc.length === 0) {
      return undefined;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {rootMargin: '-15% 0px -75% 0px'},
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => observerRef.current?.disconnect();
  }, [toc.map((item) => item.id).join(',')]);

  const tocList = (
    <ul className={styles.tocList}>
      {toc.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`${styles.tocItem} ${
              activeSection === item.id ? styles.tocItemActive : ''
            }`}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <Layout title={title} description={description}>
      <div className={styles.shell}>
        {/* ── The page tree ───────────────────────────────────── */}
        <nav className={styles.rail} aria-label="Atlas navigation">
          <div className={styles.railInner}>
            <Link to="/atlas/" className={styles.railBrand}>
              <span className={styles.railBrandMark}>WhereQ</span>
              <span className={styles.railBrandName}>Atlas</span>
            </Link>
            <p className={styles.railBlurb}>The wiki of the WhereQ Universe.</p>

            <div className={styles.railSection}>
              <ul className={styles.railList}>
                <li>
                  <Link
                    to="/atlas/"
                    className={`${styles.railLink} ${
                      !activeAppId ? styles.railLinkActive : ''
                    }`}>
                    <span className={styles.railLabel}>Overview</span>
                  </Link>
                </li>
              </ul>
            </div>

            {ATLAS_GROUPS.map((group) => (
              <div className={styles.railSection} key={group.id}>
                <p className={styles.railGroupTitle}>{group.title}</p>
                <ul className={styles.railList}>
                  {appsInGroup(group.id).map((app) => (
                    <li key={app.id}>
                      <Link
                        to={appPath(app.id)}
                        className={`${styles.railLink} ${
                          activeAppId === app.id ? styles.railLinkActive : ''
                        }`}>
                        <img className={styles.railLogo} src={app.logo} alt="" />
                        <span className={styles.railLabel}>{app.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* ── The article ─────────────────────────────────────── */}
        <main className={styles.article}>
          {toc.length > 0 && (
            <details className={styles.tocDisclosure}>
              <summary>On this page</summary>
              {tocList}
            </details>
          )}
          {children}
        </main>

        {/* ── "On this page" ──────────────────────────────────── */}
        {toc.length > 0 && (
          <aside className={styles.tocRail}>
            <nav aria-label="On this page">
              <p className={styles.tocTitle}>On this page</p>
              {tocList}
            </nav>
          </aside>
        )}
      </div>
    </Layout>
  );
}
