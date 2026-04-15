import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

async function createConfig(): Promise<Config> {
  const remarkMath = (await import('remark-math')).default;
  const rehypeKatex = (await import('rehype-katex')).default;

  return {
    title: 'WhereQ',
    tagline: 'Key to Marvel — Engineering Insights by Dazhi Zhang (Tony)',
    favicon: 'img/favicon-32x32.png',

    url: 'https://www.whereq.com',
    baseUrl: '/',

    organizationName: 'whereq',
    projectName: 'whereq.github.io',

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',

    markdown: {
      format: 'detect',
      hooks: {
        onBrokenMarkdownImages: 'ignore',
      },
    },

    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'zh-CN'],
      localeConfigs: {
        en: { label: 'English', direction: 'ltr' },
        'zh-CN': { label: '中文', direction: 'ltr' },
      },
    },

    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
      },
    ],

    presets: [
      [
        'classic',
        {
          docs: {
            sidebarPath: './sidebars.ts',
            editUrl: 'https://github.com/whereq/whereq.github.io-docusaurus/tree/main/',
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
            showLastUpdateTime: false,
            showLastUpdateAuthor: false,
          },
          blog: {
            showReadingTime: true,
            readingTime: ({ content, frontMatter, defaultReadingTime }) =>
              defaultReadingTime({ content, options: { wordsPerMinute: 200 } }),
            feedOptions: {
              type: ['rss', 'atom'],
              xslt: true,
            },
            editUrl: 'https://github.com/whereq/whereq.github.io-docusaurus/tree/main/',
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
            onInlineTags: 'warn',
            onInlineAuthors: 'warn',
            onUntruncatedBlogPosts: 'ignore',
            blogSidebarTitle: 'Recent Posts',
            blogSidebarCount: 20,
            postsPerPage: 10,
          },
          pages: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
          theme: {
            customCss: './src/css/custom.css',
          },
        } satisfies Preset.Options,
      ],
    ],

    plugins: [
      [
        '@easyops-cn/docusaurus-search-local',
        {
          hashed: true,
          language: ['en', 'zh'],
          highlightSearchTermsOnTargetPage: true,
          explicitSearchResultPath: true,
          blogDir: 'blog',
          docsDir: 'docs',
          indexBlog: true,
          indexDocs: true,
          indexPages: true,
          searchBarPosition: 'right',
        },
      ],
      [
        '@docusaurus/plugin-ideal-image',
        {
          quality: 70,
          max: 1030,
          min: 640,
          steps: 2,
          disableInDev: false,
        },
      ],
    ],

    themeConfig: {
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      image: 'img/whereq-com.png',
      metadata: [
        { name: 'keywords', content: 'engineering, distributed systems, kubernetes, java, spring, react, ai, ml' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      navbar: {
        title: 'WhereQ',
        logo: {
          alt: 'WhereQ Logo',
          src: 'img/whereq-cc.png',
          srcDark: 'img/whereq-cc.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/blog/tags', label: 'Tags', position: 'left' },
          { to: '/blog/archive', label: 'Archive', position: 'left' },
          { to: '/about', label: 'About', position: 'left' },
          { to: '/articles', label: 'Articles', position: 'left' },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/whereq',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
        hideOnScroll: false,
        style: 'dark',
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: 'Copyright © 2026 WhereQ Inc.',
      },
      prism: {
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: [
          'bash', 'java', 'python', 'typescript', 'javascript', 'jsx', 'tsx',
          'yaml', 'json', 'sql', 'kotlin', 'groovy', 'scala', 'rust', 'go',
          'docker', 'nginx', 'toml', 'markup', 'css', 'scss', 'markdown',
          'http', 'shell-session', 'diff',
        ],
        defaultLanguage: 'text',
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 4,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
    } satisfies Preset.ThemeConfig,
  };
}

export default createConfig();
