import React from 'react';
import { AtlasBlock, AtlasLink } from '../../data/atlas';
import styles from './atlas.module.css';

/** A link inside a content block — in-site links stay in the tab. */
function BlockLink({link}: {link: AtlasLink}) {
  if (link.external === false || link.href.startsWith('/')) {
    return <a href={link.href}>{link.label}</a>;
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer">
      {link.label}
    </a>
  );
}

/**
 * Renders one block of Atlas content. The four kinds — paragraph, list,
 * table and links — are the whole vocabulary of an Atlas page.
 */
export default function AtlasBlocks({blocks}: {blocks: AtlasBlock[]}) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.kind) {
          case 'paragraph':
            return (
              <p className={styles.para} key={index}>
                {block.text}
              </p>
            );

          case 'list':
            return (
              <ul className={styles.bullets} key={index}>
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );

          case 'table':
            return (
              <div className={styles.tableWrap} key={index}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {block.head.map((cell, cellIndex) => (
                        <th scope="col" key={cellIndex}>
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'links':
            return (
              <ul className={styles.linkList} key={index}>
                {block.items.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      className={styles.btn}
                      href={link.href}
                      target={link.external === false ? undefined : '_blank'}
                      rel={link.external === false ? undefined : 'noopener noreferrer'}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
