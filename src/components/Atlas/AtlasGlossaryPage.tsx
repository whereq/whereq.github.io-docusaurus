import React from 'react';
import Link from '@docusaurus/Link';
import {GLOSSARY_TERMS} from '../../data/atlas';
import AtlasShell from './AtlasShell';
import {entryById, entryPath} from './atlas-utils';
import styles from './atlas.module.css';

/**
 * The glossary.
 *
 * A glossary has its own page shape — a term and a definition — which is
 * the whole point of having it in the Atlas: it proves the wiki can carry
 * something other than a product page.
 */
export default function AtlasGlossaryPage(): React.JSX.Element {
  const terms = GLOSSARY_TERMS;

  const toc = [
    {id: 'how-to-read', label: 'How to read this'},
    {id: 'the-terms', label: 'The terms'},
  ];

  return (
    <AtlasShell
      title="The Glossary"
      description="The vocabulary of the WhereQ Atlas — the terms used across the Universe and the References shelf, defined once."
      activeCollectionId="glossary"
      toc={toc}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>The WhereQ Atlas</p>
        <h1 className={styles.heroTitle}>The Glossary</h1>
        <p className={styles.heroSubtitle}>
          The vocabulary the Universe and the References shelf share, defined
          once. Every term links to the pages where it actually turns up.
        </p>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Terms</dt>
            <dd>{terms.length}</dd>
          </div>
        </dl>
      </header>

      <section className={styles.section} id="how-to-read">
        <h2 className={styles.sectionTitle}>How to read this</h2>
        <p className={styles.para}>
          A term is worth defining only if the definition removes a
          misunderstanding. These are the ones that do — the words that mean
          something slightly different to different people, or that carry a
          consequence worth knowing before you rely on them.
        </p>
        <p className={styles.para}>
          Where a term appears on a page in the Atlas, that page is linked
          under the definition. Follow one to see the term in use.
        </p>
      </section>

      <section className={styles.section} id="the-terms">
        <h2 className={styles.sectionTitle}>The terms</h2>
        <dl className={styles.glossary}>
          {terms.map((term) => (
            <div className={styles.glossaryRow} key={term.term}>
              <dt className={styles.glossaryTerm}>{term.term}</dt>
              <dd className={styles.glossaryDefinition}>
                <p>{term.definition}</p>
                {term.related && term.related.length > 0 && (
                  <ul className={styles.glossaryLinks}>
                    {term.related.map((id) => {
                      const entry = entryById(id);
                      return (
                        <li key={id}>
                          <Link
                            className={styles.glossaryLink}
                            to={entryPath(entry.collection, entry.id)}>
                            {entry.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className={styles.pageFooter}>
        A glossary is the part of a wiki that never finishes. When a term
        shows up that is not defined here, it should be.
      </footer>
    </AtlasShell>
  );
}
