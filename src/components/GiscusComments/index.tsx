import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

/**
 * The comment thread, on every page that opens one.
 *
 * The ids are GitHub's own, and they have to agree with each other:
 * `repoId` is the repository's GraphQL id, and `categoryId` is the GraphQL
 * id of the discussion category the threads live in. The category name has
 * to match the id, or giscus cannot resolve it and the widget cannot open
 * a thread.
 *
 * To read them for a different repository or a different category:
 *
 *     gh api graphql -f query='
 *     query {
 *       repository(owner: "whereq", name: "whereq.github.io") {
 *         id
 *         discussionCategories(first: 25) { nodes { id name } }
 *       }
 *     }'
 *
 * The threads live in **General** rather than in Announcements. Announcements
 * is described by GitHub as "Updates from maintainers", and these threads are
 * readers talking back — a broken download, a name that is wrong, a question
 * about a game.
 */
export default function GiscusComments(): React.JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(245, 166, 35, 0.15)' }}>
      <Giscus
        id="comments"
        repo="whereq/whereq.github.io"
        repoId="R_kgDONDuYkg"
        category="General"
        categoryId="DIC_kwDONDuYks4C623k"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={colorMode === 'dark' ? 'dark_dimmed' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
