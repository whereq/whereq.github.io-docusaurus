/**
 * WhereQ Universe — News.
 *
 * The announcement hub for the universe. One section for the applications
 * whose source is open, one for the applications that are not — a private
 * app gets no Source link, because its repository is not public.
 *
 * WHAT THIS PAGE SHOWS
 *
 *   Announcements — a curated article, written in this project, describing
 *   what an application shipped. Not the release tags, not the commit
 *   history. The release history behind each announcement lives in
 *   `src/data/news-release-ledger.ts`, which this page does not import.
 *
 * HOW TO ADD AN ANNOUNCEMENT
 *
 *   1. Write the announcement article in this project (a blog post under
 *      `blog/` is the usual home).
 *   2. Add it to the application's `announcements` array below:
 *
 *        {
 *          title: 'Aquarius — the truth-telling release',
 *          url: '/blog/2027-01-0-aquarius-release',
 *          date: '2026-11-04',
 *        },
 *
 *      `url` may be a site-relative path (as above — the page renders it
 *      as a normal in-site link) or an absolute URL to an external article.
 *      `date` is `YYYY-MM-DD` and the table is sorted newest first.
 */

/** A curated announcement article for one application. */
export type Announcement = {
  /** The article headline. */
  title: string;
  /** Where the article lives — a site-relative path, or an absolute URL. */
  url: string;
  /** `YYYY-MM-DD`. */
  date: string;
};

export type AppCategory = {
  /** Anchor id — also the search index key. */
  id: string;
  /** The app's name as the universe knows it. */
  name: string;
  /** One line describing what the app is. */
  tagline: string;
  /** The live app. Absent when the app has no hosted instance. */
  url?: string;
  /** The GitHub repository. Only set for the open source applications. */
  repo?: string;
  /** The app's logo, under `static/img/apps/`. */
  logo: string;
  /** The app's own accent colour. */
  accent: string;
  /** The announcements, newest first. */
  announcements: Announcement[];
};

/**
 * The open source applications.
 *
 * Every one of these has a public repository, so it gets a Source button.
 * `url` is omitted where the app has no hosted instance.
 */
export const OPEN_SOURCE_APPS: AppCategory[] = [
  {
    id: 'flowdesk',
    name: 'flowdesk.top',
    tagline: 'NOVA, the AI analyst for market research — semantic search, charts and proactive insights.',
    url: 'https://flowdesk.top',
    repo: 'FlowDesktop',
    logo: '/img/apps/flowdesk.svg',
    accent: '#e8e6df',
    announcements: [],
  },
  {
    id: 'caijing',
    name: 'caijing.today',
    tagline: '财经今日 — Chinese-first financial news, hot rankings and an economic calendar.',
    url: 'https://caijing.today',
    repo: 'CaiJing-Today',
    logo: '/img/apps/caijing.svg',
    accent: '#0b63ce',
    announcements: [
      {
        title: 'CaiJing Today is open source — the board, the schema it reads, and the API in between',
        url: '/blog/CaiJing-Today-Open-Source-Announcement',
        date: '2026-11-12',
      },
      {
        title: '财经今日 开源了：界面、它读的库表结构，以及中间的 API',
        url: '/blog/CaiJing-Today-Open-Source-Announcement-CN',
        date: '2026-11-12',
      },
    ],
  },
  {
    id: 'whereq-com',
    name: 'whereq.com',
    tagline: 'The map of a place — places, schools, fuel, local news and neighbourhood boundaries.',
    url: 'https://whereq.com',
    repo: 'WhereQ-com',
    logo: '/img/apps/whereq-com.svg',
    accent: '#10b981',
    announcements: [
      {
        title: 'whereq.com is open source — the map, the crawler, and everything it reads',
        url: '/blog/WhereQ-com-Open-Source-Announcement',
        date: '2026-11-12',
      },
      {
        title: 'whereq.com 开源了：地图、爬虫，以及它读到的所有数据',
        url: '/blog/WhereQ-com-Open-Source-Announcement-CN',
        date: '2026-11-12',
      },
    ],
  },
  {
    id: 'whereq-dosbox',
    name: 'whereq-dosbox',
    tagline: 'A native Android port of DOSBox — the emulator core runs in an APK, not in a browser.',
    // No hosted instance: the APK is built from the repository, so this
    // entry carries a Source button only.
    repo: 'whereq-dosbox',
    logo: '/img/apps/whereq-dosbox.png',
    accent: '#14243d',
    announcements: [
      {
        title: 'WhereQ-DOSBox 1.0.0.7: your own DOS games, a real JIT, and a launcher that fits on a phone',
        url: '/blog/WhereQ-DOSBox-1.0.0.7',
        date: '2026-11-13',
      },
      {
        title: 'WhereQ-DOSBox 1.0.0.7：跑自己的 DOS 游戏、真正的 JIT，以及一个塞得进手机的启动器',
        url: '/blog/WhereQ-DOSBox-1.0.0.7-CN',
        date: '2026-11-13',
      },
      {
        title: 'WhereQ-DOSBox: bringing the DOS era back to your phone',
        url: '/blog/WhereQ-DOSBox-Announcement',
        date: '2026-11-12',
      },
      {
        title: 'WhereQ-DOSBox：把 DOS 年代带回手机',
        url: '/blog/WhereQ-DOSBox-Announcement-CN',
        date: '2026-11-12',
      },
    ],
  },
];

/**
 * The applications that are not open source.
 *
 * Their repositories are private, so they carry no Source link — only the
 * live app.
 */
export const PROPRIETARY_APPS: AppCategory[] = [
  {
    id: 'whereq-cloud',
    name: 'whereq.cloud',
    tagline: 'The data platform — a hosted MCP server, a public API and 25M+ named records.',
    url: 'https://whereq.cloud',
    logo: '/img/apps/whereq-cloud.png',
    accent: '#4d9bff',
    announcements: [],
  },
  {
    id: 'qhaul',
    name: 'qhaul.ca',
    tagline: 'Local drivers, same-day moving, delivery and haulage across the GTA.',
    url: 'https://qhaul.ca',
    logo: '/img/apps/qhaul.png',
    accent: '#f4621f',
    announcements: [],
  },
  {
    id: 'ccbus',
    name: 'ccbus.cc',
    tagline: 'Cross-chain everything — a bridge, a swap desk and the Buzz AI assistant.',
    url: 'https://ccbus.cc',
    logo: '/img/apps/ccbus.png',
    accent: '#f7931a',
    announcements: [],
  },
  {
    id: 'keytomarvel',
    name: 'keytomarvel.com',
    tagline: 'The Marvel-styled Keycloak identity theme for the WhereQ Universe.',
    url: 'https://keytomarvel.com',
    logo: '/img/apps/keytomarvel.png',
    accent: '#e62429',
    announcements: [],
  },
  {
    id: 'chroniq',
    name: 'chroniq.cc',
    tagline: 'Scheduling that respects your calendar — holidays, lunar dates, weather and 8 languages.',
    url: 'https://chroniq.cc',
    logo: '/img/apps/chroniq.png',
    accent: '#f59e0b',
    announcements: [],
  },
  {
    id: 'catobigato',
    name: 'catobigato.com',
    tagline: 'Games, learning and a public API — with the Luca engine open source.',
    url: 'https://catobigato.com',
    logo: '/img/apps/catobigato.png',
    accent: '#863bff',
    announcements: [],
  },
  {
    id: 'whereq-ca',
    name: 'whereq.ca',
    tagline: 'The WhereQ App Hub — the single front door to the universe.',
    url: 'https://whereq.ca',
    logo: '/img/apps/whereq-ca.png',
    accent: '#22d3ee',
    announcements: [],
  },
];

/** Newest first. A missing date sorts last. */
export function byNewest(a: Announcement, b: Announcement): number {
  return (b.date || '').localeCompare(a.date || '');
}

/** Sort an application's announcements newest first, without mutating it. */
function sorted(app: AppCategory): AppCategory {
  return {...app, announcements: [...app.announcements].sort(byNewest)};
}

/** A titled group of applications. */
export type AppSection = {
  id: string;
  title: string;
  blurb: string;
  apps: AppCategory[];
};

export const NEWS_SECTIONS: AppSection[] = [
  {
    id: 'open-source',
    title: 'Open Source Applications',
    blurb: 'Every one of these ships its source publicly — read it, fork it, run it yourself.',
    apps: OPEN_SOURCE_APPS.map(sorted),
  },
  {
    id: 'proprietary',
    title: 'Proprietary Applications',
    blurb: 'These are the products themselves. Their source is not public, so there is no Source link.',
    apps: PROPRIETARY_APPS.map(sorted),
  },
];

/** Every application, in page order. */
export const ALL_APPS: AppCategory[] = NEWS_SECTIONS.flatMap((section) => section.apps);

/** The total number of announcements across the universe. */
export const ANNOUNCEMENT_COUNT = ALL_APPS.reduce(
  (total, app) => total + app.announcements.length,
  0,
);
