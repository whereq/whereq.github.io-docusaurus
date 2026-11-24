import React, {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {Scrollbar, scrollbarCss} from '@whereq/react';
import {ATLAS_COLLECTIONS} from '../../data/atlas';
import {collectionPath, entriesInGroup, monogram} from './atlas-utils';
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
  /** The collection the open page belongs to, when one is open. */
  activeCollectionId?: string;
  /** The page that is open, when one is open. */
  activeEntryId?: string;
  /** The sections of the open page, for the "On this page" list. */
  toc?: AtlasTocItem[];
  children: React.ReactNode;
};

/**
 * The shell every Atlas page sits in: the page tree on the left, the
 * article in the middle, and "On this page" on the right.
 *
 * The tree is two levels deep — a collection, then its groups, then its
 * pages — because a wiki holds several collections that have nothing to do
 * with each other, and the tree has to say so.
 *
 * Below 1200px the right rail folds into a disclosure at the top of the
 * article. Below 996px the left rail becomes a horizontal strip, so it
 * stays one line tall on a phone instead of pushing the article down.
 */
export default function AtlasShell({
  title,
  description,
  activeCollectionId,
  activeEntryId,
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
      {/*
       * The `@whereq/react` scrollbar stylesheet, rendered here so it is in
       * the server HTML — no flash of the browser's default scrollbar before
       * hydration. The id is the library's own, so the component finds this
       * tag and does not inject a second copy.
       */}
      <style id="wq-scrollbar-styles">{scrollbarCss}</style>
      <div className={styles.shell}>
        {/* ── The page tree ───────────────────────────────────── */}
        <nav className={styles.railNav} aria-label="Atlas navigation">
          {/* The nav panel's scrollbar is the one from `@whereq/react`. */}
          <Scrollbar className={styles.rail} axis="vertical">
            <div className={styles.railInner}>
              <Link to="/atlas/" className={styles.railBrand}>
                <span className={styles.railBrandMark}>WhereQ</span>
                <span className={styles.railBrandName}>Atlas</span>
              </Link>
              <p className={styles.railBlurb}>
                A wiki of the WhereQ Universe and the craft behind it.
              </p>

              <div className={styles.railSection}>
                <ul className={styles.railList}>
                  <li>
                    <Link
                      to="/atlas/"
                      className={`${styles.railLink} ${
                        !activeCollectionId ? styles.railLinkActive : ''
                      }`}>
                      <span className={styles.railLabel}>Overview</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {ATLAS_COLLECTIONS.map((collection) => {
                const collectionActive = activeCollectionId === collection.id;

                return (
                  <div className={styles.railCollection} key={collection.id}>
                    <Link
                      to={collectionPath(collection.id)}
                      className={`${styles.railCollectionLink} ${
                        collectionActive ? styles.railLinkActive : ''
                      }`}>
                      {collection.short}
                    </Link>

                    {collection.kind === 'entries' &&
                      collection.rail !== 'collection' &&
                      collection.groups.map((group) => (
                        <div className={styles.railGroup} key={group.id}>
                          <p className={styles.railGroupTitle}>{group.title}</p>
                          <ul className={styles.railList}>
                            {entriesInGroup(collection.id, group.id).map((entry) => (
                              <li key={entry.id}>
                                <Link
                                  to={`/atlas/${collection.id}/${entry.id}/`}
                                  className={`${styles.railLink} ${
                                    activeEntryId === entry.id
                                      ? styles.railLinkActive
                                      : ''
                                  }`}>
                                  {entry.logo ? (
                                    <img className={styles.railLogo} src={entry.logo} alt="" />
                                  ) : (
                                    <span
                                      className={styles.railMonogram}
                                      style={{color: entry.accent}}
                                      aria-hidden="true">
                                      {monogram(entry.name)}
                                    </span>
                                  )}
                                  <span className={styles.railLabel}>{entry.name}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                );
              })}
            </div>
          </Scrollbar>
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
