import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComments(): JSX.Element {
  const { colorMode } = useColorMode();

  return (
    <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(245, 166, 35, 0.15)' }}>
      <Giscus
        id="comments"
        repo="whereq/whereq.github.io"
        repoId="R_kgDONDuYkg"
        category="Announcements"
        categoryId="DIC_kwDONDuYks4C623j"
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
