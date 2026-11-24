import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {GAME_REDIRECTS} from './src/data/game-redirects';

async function createConfig(): Promise<Config> {
  const remarkMath = (await import('remark-math')).default;
  const rehypeKatex = (await import('rehype-katex')).default;

  return {
    title: 'WhereQ',
    tagline: 'Engineering Insights by Dazhi Zhang (Tony)',
    favicon: 'img/favicon-32x32.png',

    // The docs hub is served from the whereq.github.io Pages repo. The
    // apex domain whereq.com is a DIFFERENT product in the WhereQ Universe
    // (the map app) and must never be named as the home of these docs:
    // www.whereq.com/docs/... answers HTTP 200 with the map app's single
    // -page shell, not with the docs. This value is what every canonical
    // tag, the sitemap and the feed URLs are built from.
    url: 'https://whereq.github.io',
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
            readingTime: ({ content, locale, frontMatter, defaultReadingTime }) =>
              defaultReadingTime({ content, locale, options: { wordsPerMinute: 200 } }),
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
      [
        '@docusaurus/plugin-client-redirects',
        {
          // The Atlas used to hold one flat namespace — /atlas/<app>/. It now
          // holds one namespace per collection — /atlas/universe/<app>/ —
          // so the thirteen pages that were published in the flat shape are
          // redirected to where they live now.
          redirects: [
            {from: '/atlas/whereq-cloud', to: '/atlas/universe/whereq-cloud'},
            {from: '/atlas/keytomarvel', to: '/atlas/universe/keytomarvel'},
            {from: '/atlas/whereq-ca', to: '/atlas/universe/whereq-ca'},
            {from: '/atlas/whereq-hub', to: '/atlas/universe/whereq-hub'},
            {from: '/atlas/flowdesk', to: '/atlas/universe/flowdesk'},
            {from: '/atlas/caijing', to: '/atlas/universe/caijing'},
            {from: '/atlas/whereq-com', to: '/atlas/universe/whereq-com'},
            {from: '/atlas/chroniq', to: '/atlas/universe/chroniq'},
            {from: '/atlas/qhaul', to: '/atlas/universe/qhaul'},
            {from: '/atlas/catobigato', to: '/atlas/universe/catobigato'},
            {from: '/atlas/whereq-cc', to: '/atlas/universe/whereq-cc'},
            {from: '/atlas/whereq-dosbox', to: '/atlas/universe/whereq-dosbox'},
            {from: '/atlas/ccbus', to: '/atlas/universe/ccbus'},
            // The DOS games moved to their own domain — pclegends.games.
            // 1 905 URLs answer with a redirect to where the game went.
            // The list is generated from the games site's own routes, so a
            // game that exists there has a redirect here.
            ...GAME_REDIRECTS,
          ],
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
          src: 'img/whereq-logo.png',
          srcDark: 'img/whereq-logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          { to: '/atlas', label: 'Atlas', position: 'left' },
          {
            href: 'https://pclegends.games',
            label: 'DOS Games',
            position: 'left',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          { to: '/blog/tags', label: 'Tags', position: 'left' },
          { to: '/blog/archive', label: 'Archive', position: 'left' },
          { to: '/about', label: 'About', position: 'left' },
          { to: '/articles', label: 'Articles', position: 'left' },
          { to: '/news', label: 'News', position: 'left' },
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
        copyright:
          'Copyright © 2026 WhereQ Inc. · <a href="/privacy">Privacy Policy</a>',
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
