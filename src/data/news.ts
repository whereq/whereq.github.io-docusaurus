/**
 * WhereQ Universe — News / release announcements.
 *
 * One category per application in the universe. Each category carries the
 * app's logo and its release announcements, newest first.
 *
 * Where the entries come from (all read from the application's own repo, so
 * the version, the date and the wording are the app's own):
 *
 *   whereq.cloud    portal/app/(marketing)/changelog/releases.ts + release_state.json
 *   flowdesk.top    git tags (the release.sh tag series)
 *   caijing.today   git tags (bin/release.sh)
 *   whereq.com      docs/CODEBASE_MEMORY.md → the deployment record
 *   qhaul.ca        git tags (bin/release.sh)
 *   ccbus.cc        docs/releases/*.md + git tags
 *   keytomarvel     git tags + the commit history
 *   chroniq.cc      docs/releases/*.md + git tags
 *   catobigato.com  docs/announcements/*.md + git tags
 *   whereq.ca       docs/releases/*.md + git tags
 */

export type Release = {
  /** The application's own version string, e.g. `v1.0.0.112` or `2027.01.0`. */
  version: string;
  /** `YYYY-MM-DD`, or `YYYY-MM` where the app only publishes a month. */
  date: string;
  /** The release note headline. */
  title: string;
  /** Where the release note itself lives. */
  url?: string;
};

export type AppCategory = {
  /** Anchor id — also the search index key. */
  id: string;
  /** The app's name as the universe knows it. */
  name: string;
  /** One line describing what the app is. */
  tagline: string;
  /** The live app. */
  url: string;
  /** The source repository. */
  repo: string;
  /** The app's logo, under `static/img/apps/`. */
  logo: string;
  /** The app's own accent colour, used for the logo tile and the heading. */
  accent: string;
  /** Release announcements, newest first. */
  releases: Release[];
};

const GH = 'https://github.com/whereq';

/** A link to the commits behind a tag. */
const tag = (repo: string, version: string) =>
  `${GH}/${repo}/commits/${version}`;

/** A link to a release note document in the app's own repository. */
const doc = (repo: string, path: string, ref = 'main') =>
  `${GH}/${repo}/blob/${ref}/${path}`;

export const APP_CATEGORIES: AppCategory[] = [
  {
    id: 'whereq-cloud',
    name: 'whereq.cloud',
    tagline: 'The data platform — a hosted MCP server, a public API and 25M+ named records.',
    url: 'https://whereq.cloud',
    repo: 'whereq.cloud',
    logo: '/img/apps/whereq-cloud.png',
    accent: '#4d9bff',
    releases: [
      {
        version: '2027.01.0',
        date: '2026-11-04',
        title: 'Aquarius — the truth-telling release',
        url: 'https://whereq.cloud/blog/2027-01-0-aquarius-release',
      },
      {
        version: '2026.10.0',
        date: '2026-10',
        title: 'Libra — stability + analytics + 9-source data expansion',
        url: 'https://whereq.cloud/docs/marketing/whereq-cloud-v9',
      },
      {
        version: 'v8',
        date: '2026-10',
        title: 'Official SDKs + five new landing pages',
        url: 'https://whereq.cloud/docs/marketing/whereq-cloud-v7',
      },
      {
        version: 'v7',
        date: '2026-09',
        title: 'Cost-of-living product + bulk export + webhooks',
        url: 'https://whereq.cloud/docs/marketing/whereq-cloud-v7',
      },
      {
        version: 'v6',
        date: '2026-08',
        title: 'Canada-first-class + portal upgrades + SVG flags',
        url: 'https://whereq.cloud/docs/marketing/whereq-cloud-v6',
      },
      {
        version: 'v5',
        date: '2026-07',
        title: 'Prices deep-dive — fuel, groceries, energy, home, rent',
        url: 'https://whereq.cloud/docs/marketing/whereq-cloud-v5',
      },
      {
        version: 'v4',
        date: '2026-06',
        title: 'Trending + Autos expanded to 4 tabs + MCP grew to 26 tools',
        url: 'https://whereq.cloud/docs/marketing/whereq-cloud-v4',
      },
      {
        version: 'v3',
        date: '2026-04',
        title: 'Categories + Autos + Trending personalization',
        url: 'https://whereq.cloud/docs/marketing/whereq-cloud-v3',
      },
      {
        version: 'v2',
        date: '2026-03',
        title: 'Trending grew to 41 sources',
        url: 'https://whereq.cloud/docs/marketing/whereq-cloud-v2',
      },
      {
        version: 'v1',
        date: '2026-02',
        title: 'Public launch',
        url: 'https://whereq.cloud/docs/marketing',
      },
    ],
  },
  {
    id: 'flowdesk',
    name: 'flowdesk.top',
    tagline: 'NOVA, the AI analyst for market research — semantic search, charts and proactive insights.',
    url: 'https://flowdesk.top',
    repo: 'flowdesk.top',
    logo: '/img/apps/flowdesk.svg',
    accent: '#e8e6df',
    releases: [
      {
        version: 'v1.0.0.88',
        date: '2026-11-08',
        title: 'Repin the platform to the revision carrying the Alembic fixes',
        url: tag('flowdesk.top', 'v1.0.0.88'),
      },
      {
        version: 'v1.0.0.87',
        date: '2026-11-08',
        title: 'Pin the platform revision and install production deps from uv.lock',
        url: tag('flowdesk.top', 'v1.0.0.87'),
      },
      {
        version: 'v1.0.0.86',
        date: '2026-11-08',
        title: 'Fix short-interest column mapping to match the platform schema',
        url: tag('flowdesk.top', 'v1.0.0.86'),
      },
      {
        version: 'v1.0.0.85',
        date: '2026-11-07',
        title: 'Refine release.sh and deploy.sh',
        url: tag('flowdesk.top', 'v1.0.0.85'),
      },
      {
        version: 'v1.0.0.84',
        date: '2026-11-07',
        title: 'Upgrade the backend and frontend dependencies',
        url: tag('flowdesk.top', 'v1.0.0.84'),
      },
      {
        version: 'v1.0.0.83',
        date: '2026-09-26',
        title: 'Use the FlowDesk logo for the PWA and apple-touch icons',
        url: tag('flowdesk.top', 'v1.0.0.83'),
      },
      {
        version: 'v1.0.0.82',
        date: '2026-09-26',
        title: 'async def for the _select_prefix helper',
        url: tag('flowdesk.top', 'v1.0.0.82'),
      },
      {
        version: 'v1.0.0.81',
        date: '2026-09-26',
        title: 'Smarter suggestions — handle insertion typos',
        url: tag('flowdesk.top', 'v1.0.0.81'),
      },
      {
        version: 'v1.0.0.80',
        date: '2026-09-26',
        title: 'Richer error messages with symbol suggestions',
        url: tag('flowdesk.top', 'v1.0.0.80'),
      },
      {
        version: 'v1.0.0.79',
        date: '2026-09-26',
        title: 'sqlalchemy[asyncio] to install greenlet; ChatQuota.keycloak_id in _check_quota',
        url: tag('flowdesk.top', 'v1.0.0.79'),
      },
      {
        version: 'v1.0.0.78',
        date: '2026-09-26',
        title: 'ChatQuota.user_id → keycloak_id in _check_quota (500 on /ai/* endpoints)',
        url: tag('flowdesk.top', 'v1.0.0.78'),
      },
      {
        version: 'v1.0.0.77',
        date: '2026-09-15',
        title: 'Fix the duplicate header logo + the i18n key leak in the sector/exchange filters',
        url: tag('flowdesk.top', 'v1.0.0.77'),
      },
    ],
  },
  {
    id: 'caijing',
    name: 'caijing.today',
    tagline: '财经今日 — Chinese-first financial news, hot rankings and an economic calendar.',
    url: 'https://caijing.today',
    repo: 'caijing.today',
    logo: '/img/apps/caijing.svg',
    accent: '#0b63ce',
    releases: [
      {
        version: 'v1.0.0.6',
        date: '2026-11-08',
        title: 'Run the revision the deploy just pulled, not the one it started with',
        url: tag('caijing.today', 'v1.0.0.6'),
      },
      {
        version: 'v1.0.0.5',
        date: '2026-11-08',
        title: 'Fix the deploy summary: it filed one step’s verdict under another step',
        url: tag('caijing.today', 'v1.0.0.5'),
      },
      {
        version: 'v1.0.0.4',
        date: '2026-11-08',
        title: 'Fix the frontend truthfulness bugs, add tests and a CI gate, and settle the timezone docs',
        url: tag('caijing.today', 'v1.0.0.4'),
      },
      {
        version: 'v1.0.0.3',
        date: '2026-11-07',
        title: 'The deploy runbook and the deploy script',
        url: tag('caijing.today', 'v1.0.0.3'),
      },
      {
        version: 'v1.0.0.2',
        date: '2026-11-07',
        title: 'A schema check and a hardened deploy script',
        url: tag('caijing.today', 'v1.0.0.2'),
      },
      {
        version: 'v1.0.0.1',
        date: '2026-11-07',
        title: 'The platform foundation — a release script, the architecture doc and the news and market-intelligence services',
        url: tag('caijing.today', 'v1.0.0.1'),
      },
      {
        version: '2026-08-24',
        date: '2026-08-24',
        title: 'The whereq-data-platform prompt for a manual editorial CMS',
        url: doc('caijing.today', 'docs/CAIJING_CMS_PLATFORM_PROMPT.md'),
      },
      {
        version: '2026-08-24',
        date: '2026-08-24',
        title: 'Sector Heat: collapse by default with an expand toggle; denser, magnitude-sorted',
        url: tag('caijing.today', 'v1.0.0.1'),
      },
      {
        version: '2026-08-19',
        date: '2026-08-19',
        title: 'Finance hot-ranking (个股热榜): the read side and the collector prompt',
        url: doc('caijing.today', 'docs/CAIJING_HOTLIST_COLLECTOR_PROMPT.md'),
      },
      {
        version: '2026-08-19',
        date: '2026-08-19',
        title: 'Chinese-first brand — the default UI locale is Chinese',
        url: tag('caijing.today', 'v1.0.0.1'),
      },
      {
        version: '2026-08-19',
        date: '2026-08-19',
        title: 'Avatars and sign-in/out in the header and the mobile drawer',
        url: tag('caijing.today', 'v1.0.0.1'),
      },
      {
        version: '2026-08-18',
        date: '2026-08-18',
        title: 'Deploy to the new PROD server — frontend on 8084, API on 8004',
        url: doc('caijing.today', 'docs/DEPLOYMENT.md'),
      },
    ],
  },
  {
    id: 'whereq-com',
    name: 'whereq.com',
    tagline: 'The map of a place — places, schools, fuel, local news and neighbourhood boundaries.',
    url: 'https://whereq.com',
    repo: 'whereq.com',
    logo: '/img/apps/whereq-com.svg',
    accent: '#10b981',
    releases: [
      {
        version: 'v1.0.0.112',
        date: '2026-11-11',
        title: 'History rewrite: the school data and the credential literals are purged from every commit; the boundary POC page is removed',
        url: tag('whereq.com', 'v1.0.0.112'),
      },
      {
        version: 'v1.0.0.111',
        date: '2026-11-11',
        title: 'The settings tests no longer depend on a local .env',
        url: tag('whereq.com', 'v1.0.0.111'),
      },
      {
        version: 'v1.0.0.109',
        date: '2026-11-11',
        title: 'Require credentials from the environment, never from the repo',
        url: tag('whereq.com', 'v1.0.0.109'),
      },
      {
        version: 'v1.0.0.108',
        date: '2026-11-10',
        title: 'The map style is a chip row with react-icons',
        url: tag('whereq.com', 'v1.0.0.108'),
      },
      {
        version: 'v1.0.0.107',
        date: '2026-11-09',
        title: 'The catchment’s point count counted coordinates, not positions',
        url: tag('whereq.com', 'v1.0.0.107'),
      },
      {
        version: 'v1.0.0.106',
        date: '2026-11-08',
        title: 'A school’s catchment on the main map, and the search box that matches the card',
        url: tag('whereq.com', 'v1.0.0.106'),
      },
      {
        version: 'v1.0.0.105',
        date: '2026-11-08',
        title: 'The geography feature, as the user sees it',
        url: tag('whereq.com', 'v1.0.0.105'),
      },
      {
        version: 'v1.0.0.104',
        date: '2026-11-08',
        title: 'The way back to a card the user dismissed',
        url: tag('whereq.com', 'v1.0.0.104'),
      },
      {
        version: 'v1.0.0.103',
        date: '2026-11-08',
        title: 'The radius role is one control, and an area can be drawn on the map',
        url: tag('whereq.com', 'v1.0.0.103'),
      },
      {
        version: 'v1.0.0.102',
        date: '2026-11-08',
        title: 'The administrative areas that contain the places',
        url: tag('whereq.com', 'v1.0.0.102'),
      },
      {
        version: 'v1.0.0.101',
        date: '2026-11-07',
        title: 'The place cards (phase 1) — a signed-in user makes their own card for an address they name',
        url: tag('whereq.com', 'v1.0.0.101'),
      },
      {
        version: 'v1.0.0.99',
        date: '2026-11-07',
        title: 'The search box keeps the text that was searched for',
        url: tag('whereq.com', 'v1.0.0.99'),
      },
      {
        version: 'v1.0.0.97',
        date: '2026-11-07',
        title: 'The main map’s four layers move off the deprecated google.maps.Marker',
        url: tag('whereq.com', 'v1.0.0.97'),
      },
      {
        version: 'v1.0.0.93',
        date: '2026-11-07',
        title: 'Every marker opens the search modal scoped to that place',
        url: tag('whereq.com', 'v1.0.0.93'),
      },
      {
        version: 'v1.0.0.92',
        date: '2026-11-07',
        title: 'The sidebar’s search box was a design mock — it now runs a real search',
        url: tag('whereq.com', 'v1.0.0.92'),
      },
    ],
  },
  {
    id: 'qhaul',
    name: 'qhaul.ca',
    tagline: 'Local drivers, same-day moving, delivery and haulage across the GTA.',
    url: 'https://qhaul.ca',
    repo: 'qhaul.ca',
    logo: '/img/apps/qhaul.png',
    accent: '#f4621f',
    releases: [
      {
        version: 'v1.1.0.50',
        date: '2026-11-11',
        title: 'The drive-jobs page and the booking contract',
        url: tag('qhaul.ca', 'v1.1.0.50'),
      },
      {
        version: 'v1.1.0.49',
        date: '2026-11-11',
        title: 'Route contractor mode — the contracts, the API and the runbook',
        url: tag('qhaul.ca', 'v1.1.0.49'),
      },
      {
        version: 'v1.1.0.48',
        date: '2026-11-10',
        title: 'The driver API',
        url: tag('qhaul.ca', 'v1.1.0.48'),
      },
      {
        version: 'v1.1.0.47',
        date: '2026-11-10',
        title: 'The quote flow',
        url: tag('qhaul.ca', 'v1.1.0.47'),
      },
      {
        version: 'v1.1.0.46',
        date: '2026-11-10',
        title: 'Driver alerts on mobile',
        url: tag('qhaul.ca', 'v1.1.0.46'),
      },
      {
        version: 'v1.1.0.45',
        date: '2026-11-10',
        title: 'The booking contracts and the sitemap',
        url: tag('qhaul.ca', 'v1.1.0.45'),
      },
      {
        version: 'v1.1.0.44',
        date: '2026-11-09',
        title: 'The privacy tests and the ops console',
        url: tag('qhaul.ca', 'v1.1.0.44'),
      },
      {
        version: 'v1.1.0.43',
        date: '2026-11-07',
        title: 'The APK publish flow points at the whereq.ca repo folder',
        url: tag('qhaul.ca', 'v1.1.0.43'),
      },
      {
        version: 'v1.1.0.41',
        date: '2026-11-06',
        title: 'The booking page and the admin ops console',
        url: tag('qhaul.ca', 'v1.1.0.41'),
      },
      {
        version: 'v1.1.0.39',
        date: '2026-11-06',
        title: 'The booking confirmation flow',
        url: tag('qhaul.ca', 'v1.1.0.39'),
      },
      {
        version: 'v1.1.0.37',
        date: '2026-11-05',
        title: 'The CI gate, the locale context and the Next.js image config',
        url: tag('qhaul.ca', 'v1.1.0.37'),
      },
      {
        version: 'v1.1.0.12',
        date: '2026-10-26',
        title: 'The /app and /drive headers match the marketing header',
        url: tag('qhaul.ca', 'v1.1.0.12'),
      },
      {
        version: 'v1.1.0.12',
        date: '2026-10-26',
        title: 'The homepage activity feed is real now, not fabricated',
        url: tag('qhaul.ca', 'v1.1.0.12'),
      },
      {
        version: 'v1.1.0.11',
        date: '2026-10-26',
        title: 'Authenticated quotes bind to the caller’s real org',
        url: tag('qhaul.ca', 'v1.1.0.11'),
      },
      {
        version: 'v1.1.0.11',
        date: '2026-10-26',
        title: 'Push notification delivery via Expo',
        url: tag('qhaul.ca', 'v1.1.0.11'),
      },
      {
        version: 'v1.1.0.11',
        date: '2026-10-26',
        title: 'The driver’s active-jobs section shows real in-progress jobs',
        url: tag('qhaul.ca', 'v1.1.0.11'),
      },
      {
        version: 'v1.1.0.11',
        date: '2026-10-26',
        title: 'Real address autocomplete on the quote screen',
        url: tag('qhaul.ca', 'v1.1.0.11'),
      },
      {
        version: 'v1.1.0.10',
        date: '2026-10-26',
        title: 'Brute-force protection on the ROPC surface',
        url: tag('qhaul.ca', 'v1.1.0.10'),
      },
      {
        version: 'v1.1.0.10',
        date: '2026-10-26',
        title: 'WeChat accounts unify on the unionid federated identity',
        url: tag('qhaul.ca', 'v1.1.0.10'),
      },
    ],
  },
  {
    id: 'ccbus',
    name: 'ccbus.cc',
    tagline: 'Cross-chain everything — a bridge, a swap desk and the Buzz AI assistant.',
    url: 'https://ccbus.cc',
    repo: 'ccbus.cc',
    logo: '/img/apps/ccbus.png',
    accent: '#f7931a',
    releases: [
      {
        version: 'v2.0.0.71',
        date: '2026-08-11',
        title: 'Buzz: locale-driven response language',
        url: tag('ccbus.cc', 'v2.0.0.71'),
      },
      {
        version: 'v2.0.0.70',
        date: '2026-08-10',
        title: 'Buzz: default panel width',
        url: tag('ccbus.cc', 'v2.0.0.70'),
      },
      {
        version: 'v2.0.0.69',
        date: '2026-08-10',
        title: 'Buzz: default panel height',
        url: tag('ccbus.cc', 'v2.0.0.69'),
      },
      {
        version: 'v2.0.0.68',
        date: '2026-08-10',
        title: 'Buzz: a bigger, resizable panel',
        url: tag('ccbus.cc', 'v2.0.0.68'),
      },
      {
        version: 'v2.0.0.67',
        date: '2026-08-10',
        title: 'Buzz: the thinking state and the prefill fix',
        url: tag('ccbus.cc', 'v2.0.0.67'),
      },
      {
        version: 'v2.0.0.66',
        date: '2026-08-10',
        title: 'Buzz: fix the launch button overlap',
        url: tag('ccbus.cc', 'v2.0.0.66'),
      },
      {
        version: 'v2.0.0.65',
        date: '2026-08-09',
        title: 'Buzz: the avatar image',
        url: tag('ccbus.cc', 'v2.0.0.65'),
      },
      {
        version: 'v2.0.0.64',
        date: '2026-08-09',
        title: 'Buzz: the table styling',
        url: tag('ccbus.cc', 'v2.0.0.64'),
      },
      {
        version: 'v2.0.0.63',
        date: '2026-08-09',
        title: 'Buzz: markdown links, and no raw HTML',
        url: tag('ccbus.cc', 'v2.0.0.63'),
      },
      {
        version: 'v2.0.0.62',
        date: '2026-08-09',
        title: 'Buzz: the token-tax prefill',
        url: tag('ccbus.cc', 'v2.0.0.62'),
      },
      {
        version: 'v2.0.0.61',
        date: '2026-08-09',
        title: 'Buzz: the prefill for all token creators',
        url: tag('ccbus.cc', 'v2.0.0.61'),
      },
      {
        version: 'v2.0.0.60',
        date: '2026-08-09',
        title: 'Buzz: the token form prefill',
        url: tag('ccbus.cc', 'v2.0.0.60'),
      },
      {
        version: 'v2.0.0.58',
        date: '2026-08-09',
        title: 'Fix the Buzz widget wallet access (walletManager)',
        url: tag('ccbus.cc', 'v2.0.0.58'),
      },
      {
        version: 'v2.0.0.57',
        date: '2026-08-09',
        title: 'Point the Buzz frontend at buzz.ccbus.cc',
        url: tag('ccbus.cc', 'v2.0.0.57'),
      },
      {
        version: 'v2.0.0.56',
        date: '2026-08-08',
        title: 'Buzz: the AI assistant frontend — the widget, hybrid managed/BYOK, SIWE',
        url: tag('ccbus.cc', 'v2.0.0.56'),
      },
      {
        version: 'v2.0.0.56',
        date: '2026-06-15',
        title: 'Four Zone is live, and CCBus goes Solana',
        url: doc('ccbus.cc', 'docs/releases/v2.0.0.56-four-and-solana.md'),
      },
    ],
  },
  {
    id: 'keytomarvel',
    name: 'keytomarvel.com',
    tagline: 'The Marvel-styled Keycloak identity theme for the WhereQ Universe.',
    url: 'https://keytomarvel.com',
    repo: 'KeyToMarvel.com',
    logo: '/img/apps/keytomarvel.png',
    accent: '#e62429',
    releases: [
      {
        version: 'v26.7.0',
        date: '2026-10-26',
        title: 'v26.7.0 — synced with the PROD runtime',
        url: tag('KeyToMarvel.com', 'v26.7.0'),
      },
      {
        version: '2026-08-01',
        date: '2026-08-01',
        title: 'Bump the Keycloak base image to 26.7.0',
        url: doc('KeyToMarvel.com', 'docs/PROD-DEPLOYMENT.md'),
      },
      {
        version: '2026-05-05',
        date: '2026-05-05',
        title: 'A Java-based healthcheck for the Keycloak UBI minimal container',
        url: doc('KeyToMarvel.com', 'docs/PROD-DEPLOYMENT.md'),
      },
      {
        version: '2026-05-05',
        date: '2026-05-05',
        title: 'Enable the health endpoint in the PROD compose',
        url: doc('KeyToMarvel.com', 'docs/PROD-DEPLOYMENT.md'),
      },
      {
        version: '2026-05-02',
        date: '2026-05-02',
        title: 'The KeyToMarvel skills for Claude Code',
        url: doc('KeyToMarvel.com', 'CLAUDE.md'),
      },
      {
        version: '2026-04-29',
        date: '2026-04-29',
        title: 'Upgrade the Docker version and the WeChat provider',
        url: doc('KeyToMarvel.com', 'pom.xml'),
      },
      {
        version: '2026-04-27',
        date: '2026-04-27',
        title: 'Fix the avatar upload issue',
        url: doc('KeyToMarvel.com', 'CLAUDE.md'),
      },
      {
        version: '2026-04-25',
        date: '2026-04-25',
        title: 'Add the avatar upload endpoint',
        url: doc('KeyToMarvel.com', 'CLAUDE.md'),
      },
      {
        version: '2026-04-24',
        date: '2026-04-24',
        title: 'The RP4 + Cloudflare deployment happy path, and the vegeta theme aligned',
        url: doc('KeyToMarvel.com', 'docs/PROD-DEPLOYMENT.md'),
      },
      {
        version: '2026-04-21',
        date: '2026-04-21',
        title: 'WSL-specific Docker Compose and Keycloak config variants',
        url: doc('KeyToMarvel.com', 'docs/wsl-vscode-local-dev-guide.md'),
      },
      {
        version: '2026-04-20',
        date: '2026-04-20',
        title: 'The WSL + VS Code local development guide',
        url: doc('KeyToMarvel.com', 'docs/wsl-vscode-local-dev-guide.md'),
      },
      {
        version: '2025-02-17',
        date: '2025-02-17',
        title: 'Upgrade to 26.1',
        url: tag('KeyToMarvel.com', 'v26.7.0'),
      },
    ],
  },
  {
    id: 'chroniq',
    name: 'chroniq.cc',
    tagline: 'Scheduling that respects your calendar — holidays, lunar dates, weather and 8 languages.',
    url: 'https://chroniq.cc',
    repo: 'chroniq.cc',
    logo: '/img/apps/chroniq.png',
    accent: '#f59e0b',
    releases: [
      {
        version: 'v1.0.0.53',
        date: '2026-11-07',
        title: 'Fix the PROD crash issue',
        url: tag('chroniq.cc', 'v1.0.0.53'),
      },
      {
        version: 'v1.0.0.52',
        date: '2026-11-07',
        title: 'Fix the PROD crash issue',
        url: tag('chroniq.cc', 'v1.0.0.52'),
      },
      {
        version: 'v1.0.0.51',
        date: '2026-11-07',
        title: 'The frontend build — the PostCSS config, the theme tokens and the lockfile',
        url: tag('chroniq.cc', 'v1.0.0.51'),
      },
      {
        version: 'v1.0.0.50',
        date: '2026-11-07',
        title: 'Refine release.sh and deploy.sh',
        url: tag('chroniq.cc', 'v1.0.0.50'),
      },
      {
        version: 'v1.0.0.49',
        date: '2026-09-04',
        title: 'Keycloak signin: use non-www keytomarvel.com — the www redirect was dropping the CORS header on the token endpoint',
        url: tag('chroniq.cc', 'v1.0.0.49'),
      },
      {
        version: 'v1.0.0.48',
        date: '2026-08-08',
        title: 'SOL: render the assistant’s markdown, with tight Metro panel styling',
        url: tag('chroniq.cc', 'v1.0.0.48'),
      },
      {
        version: 'v1.0.0.47',
        date: '2026-08-08',
        title: 'SOL: strip the reasoning from the visible output, streaming-safe',
        url: tag('chroniq.cc', 'v1.0.0.47'),
      },
      {
        version: 'v1.0.0.46',
        date: '2026-08-08',
        title: 'SOL AI assistant (phase 1) — the LiteLLM gateway, the calendar tool registry and the chat SSE endpoint',
        url: tag('chroniq.cc', 'v1.0.0.46'),
      },
      {
        version: 'v1.0.0.45',
        date: '2026-08-07',
        title: 'Rewrite the About page around the calendar-first differentiator, with honest pricing',
        url: tag('chroniq.cc', 'v1.0.0.45'),
      },
      {
        version: 'v1.0.0.44',
        date: '2026-08-07',
        title: 'Fix the payments webhook 500 — verify the Stripe signature with construct_event',
        url: tag('chroniq.cc', 'v1.0.0.44'),
      },
      {
        version: 'v1.0.0.43',
        date: '2026-08-07',
        title: 'Metro UI radius sweep — remap the Tailwind box radii and collapse the CSS token usages',
        url: tag('chroniq.cc', 'v1.0.0.43'),
      },
      {
        version: 'v1.0.0.40',
        date: '2026-08-07',
        title: 'The header Upgrade chip deep-links to the plan for signed-in Free users',
        url: tag('chroniq.cc', 'v1.0.0.40'),
      },
      {
        version: '1.0',
        date: '2026-08-01',
        title: 'chroniq.cc is here — scheduling that respects your calendar',
        url: doc('chroniq.cc', 'docs/releases/RELEASE-1.0-marketing.md'),
      },
    ],
  },
  {
    id: 'catobigato',
    name: 'catobigato.com',
    tagline: 'Games, learning and a public API — with the Luca engine open source.',
    url: 'https://catobigato.com',
    repo: 'catobigato.com',
    logo: '/img/apps/catobigato.svg',
    accent: '#863bff',
    releases: [
      {
        version: 'v1.0.0.190',
        date: '2026-11-07',
        title: 'Refine release.sh and deploy.sh',
        url: tag('catobigato.com', 'v1.0.0.190'),
      },
      {
        version: 'v1.0.0.189',
        date: '2026-09-04',
        title: 'Point Keycloak at the apex keytomarvel.com (drop the www redirect)',
        url: tag('catobigato.com', 'v1.0.0.189'),
      },
      {
        version: 'v1.0.0.188',
        date: '2026-08-18',
        title: 'Surface the empty MiniMax responses — a 200 is not a success',
        url: tag('catobigato.com', 'v1.0.0.188'),
      },
      {
        version: 'v1.0.0.185',
        date: '2026-08-12',
        title: 'The engine behind our games is now open source',
        url: doc('catobigato.com', 'docs/announcements/2026-08-12-v1.0.0.185-luca-oss-llm-native-marketing.md'),
      },
      {
        version: 'v1.0.0.175',
        date: '2026-08-09',
        title: 'Build on CatoBigato — the Public API v1',
        url: doc('catobigato.com', 'docs/announcements/2026-08-09-v1.0.0.175-public-api-marketing.md'),
      },
      {
        version: 'v1.0.0.174',
        date: '2026-08-08',
        title: 'Say hello to the Arcade',
        url: doc('catobigato.com', 'docs/announcements/2026-08-08-v1.0.0.174-game-engine-arcade-marketing.md'),
      },
      {
        version: 'v1.0.0.147',
        date: '2026-07-04',
        title: 'Swipe, shoot, score — basketball, in real time',
        url: doc('catobigato.com', 'docs/announcements/2026-07-04-v1.0.0.147-basketball-real-time-marketing.md'),
      },
      {
        version: 'v1.0.0.140',
        date: '2026-06-30',
        title: 'The whole arcade just lit up',
        url: doc('catobigato.com', 'docs/announcements/2026-06-30-v1.0.0.140-games-complete-marketing.md'),
      },
      {
        version: 'v1.0.0.107',
        date: '2026-06-28',
        title: 'Luca Games: a new FAQ and a cleaner look',
        url: doc('catobigato.com', 'docs/announcements/2026-06-28-v1.0.0.107-faq-hero-marketing.md'),
      },
      {
        version: 'v1.0.0.106',
        date: '2026-06-28',
        title: 'Luca Games get a proper home — the native CatoBigato design and how-to-play',
        url: doc('catobigato.com', 'docs/announcements/2026-06-28-v1.0.0.106-native-ui-marketing.md'),
      },
      {
        version: 'v1.0.0.105',
        date: '2026-06-28',
        title: 'Luca Games — meet the new member of the CatoBigato family',
        url: doc('catobigato.com', 'docs/announcements/2026-06-28-v1.0.0.105-luca-rename-marketing.md'),
      },
      {
        version: 'v1.0.0.101',
        date: '2026-06-28',
        title: 'CatoBigato games get a production-grade engine under the hood',
        url: doc('catobigato.com', 'docs/announcements/2026-06-28-v1.0.0.101-engine-marketing.md'),
      },
      {
        version: 'v1.0.0.100',
        date: '2026-06-28',
        title: 'Sudoku drops at CatoBigato — and your best score lives here now',
        url: doc('catobigato.com', 'docs/announcements/2026-06-28-v1.0.0.100-games-session-3-marketing.md'),
      },
      {
        version: 'v1.0.0.99',
        date: '2026-06-28',
        title: 'Two games just dropped at CatoBigato',
        url: doc('catobigato.com', 'docs/announcements/2026-06-28-v1.0.0.99-games-session-2-marketing.md'),
      },
      {
        version: 'v1.0.0.98',
        date: '2026-06-28',
        title: 'Games have arrived at CatoBigato',
        url: doc('catobigato.com', 'docs/announcements/2026-06-28-v1.0.0.98-games-marketing.md'),
      },
      {
        version: 'v1.0.0.95',
        date: '2026-06-27',
        title: 'Tutor bookings just got trust signals and set-and-forget scheduling',
        url: doc('catobigato.com', 'docs/announcements/2026-06-27-v1.0.0.95-marketing.md'),
      },
      {
        version: 'v1.0.0.93',
        date: '2026-06-27',
        title: 'Your Catobi just got a whole new set of tricks',
        url: doc('catobigato.com', 'docs/announcements/2026-06-27-v1.0.0.93-marketing.md'),
      },
      {
        version: 'v1.0.0.87',
        date: '2026-06-27',
        title: 'CatoBigato just got way more social',
        url: doc('catobigato.com', 'docs/announcements/2026-06-27-v1.0.0.87-marketing.md'),
      },
    ],
  },
  {
    id: 'whereq-ca',
    name: 'whereq.ca',
    tagline: 'The WhereQ App Hub — the single front door to the universe.',
    url: 'https://whereq.ca',
    repo: 'whereq.ca',
    logo: '/img/apps/whereq-ca.png',
    accent: '#22d3ee',
    releases: [
      {
        version: 'v1.4.1',
        date: '2026-11-12',
        title: 'Clean up',
        url: doc('whereq.ca', 'docs/releases/v1.4.1-clean-up-2026-11-12.md'),
      },
      {
        version: 'v1.3.1',
        date: '2026-11-08',
        title: 'Image to PDF — turn up to 9 uploaded images into a PDF in the browser',
        url: doc('whereq.ca', 'docs/releases/v1.3.1-image-to-pdf-2026-11-08.md'),
      },
      {
        version: 'v1.2.1',
        date: '2026-11-07',
        title: 'A small follow-up: the release script can now write the release note’s own status line',
        url: doc('whereq.ca', 'docs/releases/v1.2.1-status-flag-2026-11-07.md'),
      },
      {
        version: 'v1.2.0',
        date: '2026-11-07',
        title: 'The release pipeline — one command from a clean tree to a live deploy',
        url: doc('whereq.ca', 'docs/releases/v1.2.0-add-release-script-2026-11-07.md'),
      },
      {
        version: 'v1.1.0',
        date: '2026-09-07',
        title: 'Cloud + CC join the galaxy',
        url: doc('whereq.ca', 'docs/releases/v1.1.0-cloud-cc-2026-09-07.md'),
      },
      {
        version: 'v1.0.0',
        date: '2026-06-16',
        title: 'The Galaxy Launch',
        url: doc('whereq.ca', 'docs/releases/v1.0.0-galaxy-2026-06-16.md'),
      },
    ],
  },
];

/** Newest first. A missing or partial date sorts last. */
export function byNewest(a: Release, b: Release): number {
  return (b.date || '').localeCompare(a.date || '');
}

/** The categories, each with its releases sorted newest first. */
export const NEWS_SECTIONS: AppCategory[] = APP_CATEGORIES.map((app) => ({
  ...app,
  releases: [...app.releases].sort(byNewest),
}));
