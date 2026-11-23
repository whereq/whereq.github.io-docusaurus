/**
 * The WhereQ Universe — one collection of the WhereQ Atlas.
 *
 * Every application in the universe gets one page here. The shape of a page
 * is fixed so a reader always knows where to look:
 *
 *   What it is → What it does → How it fits the universe → Under the hood
 *
 * The `id` of an application is its id in `news.ts` where it has one, so
 * the two can never drift apart. `whereq-cc` and `whereq-hub` are declared
 * here only, because they are not on the News page.
 *
 * This file holds content, not layout. The layout lives in
 * `src/components/Atlas/`.
 */

import {AtlasEntry, AtlasGroup, AtlasQuestion, AtlasSection} from './atlas-types';

export const UNIVERSE_GROUPS: AtlasGroup[] = [
  {
    id: 'foundation',
    title: 'The Foundation',
    blurb:
      'The layers everything else stands on — one data spine, one identity, one research loop, one voice.',
  },
  {
    id: 'fintch',
    title: 'FinTech & Markets',
    blurb:
      'Research, news and market data, both reading from the same centralized data cloud.',
  },
  {
    id: 'geo',
    title: 'Geo & Location',
    blurb:
      'Maps, routing, places and neighbourhood boundaries — the spatial core of the universe.',
  },
  {
    id: 'booking',
    title: 'Booking & Scheduling',
    blurb: 'The temporal layer: events, availability and the calendar everything else sets its clocks by.',
  },
  {
    id: 'logistics',
    title: 'Logistics & Moving',
    blurb: 'Local driver supply, instant quotes and live tracking across the GTA.',
  },
  {
    id: 'learning',
    title: 'AI Learning & Tutoring',
    blurb: 'An AI study companion that explains, quizzes and draws — for K-12 and beyond.',
  },
  {
    id: 'media',
    title: 'Private Media & AI Tagging',
    blurb: 'A photo vault that stays encrypted in the browser, with on-demand AI.',
  },
  {
    id: 'retro',
    title: 'Retro Computing',
    blurb: 'A complete DOS emulator built natively for Android, not in a browser.',
  },
  {
    id: 'web3',
    title: 'Web3 & DeFi',
    blurb: 'Token creation, presales, liquidity and wallet tooling across 13 chains.',
  },
];

export const UNIVERSE_ENTRIES: AtlasEntry[] = [
  {
    id: 'whereq-cloud',
    collection: 'universe',
    name: 'whereq.cloud',
    role: 'The Data Platform',
    tagline: 'One source of truth for every world.',
    logo: '/img/apps/whereq-cloud.png',
    accent: '#38BDF8',
    group: 'foundation',
    related: ['postgresql', 'mcp'],
    question: 'HOW',
    summary:
      'The data backbone beneath the products. whereq.cloud owns the shared database schema and runs all data collection — market data, feeds and metrics streaming from free-tier providers into a single source of truth that every product in the universe reads from.',
    status: 'Live',
    url: 'https://whereq.cloud',
    capabilities: [
      'A versioned, metered REST API over every dataset it owns, with cursor pagination, ETag caching and per-key scopes.',
      'A hosted MCP server — 80 tools over stdio and streamable HTTP — so an agent can query the same data directly.',
      'Scheduled collection from free and premium providers, with collection monitoring and anomaly detection.',
      'Bilingual financial news and editorial (中文 / EN), hot rankings, quotes, and the economic calendar.',
      '22,000+ instruments tracked across 15 global exchanges, with 5.4M+ quotes stored.',
      'Official Python and JavaScript SDKs, plus public endpoints that work without a key.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'whereq.cloud is where the universe keeps its facts. It owns the shared schema, runs the collectors that fill it, and publishes it through one API. Everything else in the universe consumes that data instead of scraping the world separately.',
          },
          {
            kind: 'paragraph',
            text: 'The same platform carries the domains the products need: global equities and quotes, finance news, hot rankings, the macro calendar, and — beyond finance — geography, fuel prices, cost-of-living series, autos and industry directories.',
          },
        ],
      },
      {
        title: 'The API surface',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Every resource is a stable JSON contract. These are the ones products build on:',
          },
          {
            kind: 'table',
            head: ['Resource', 'What it returns'],
            rows: [
              ['/v1/news', 'Real-time finance news feed and curated editorial, bilingual'],
              ['/v1/flash', 'Breaking market flashes, timestamped and prioritised'],
              ['/v1/hotstocks', 'The blended cross-source heat ranking (个股热榜)'],
              ['/v1/quotes', 'Curated indices, FX, commodities and crypto, with sparklines'],
              ['/v1/calendar', 'Upcoming macro releases with forecast, previous and actual'],
              ['/v1/pages', 'Published CMS pages and typed content blocks'],
            ],
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'whereq.cloud is a dependency, not a competitor. FlowDesk pulls its market data from the Data API; caijing.today reads the same published PostgreSQL schema contract through its own FastAPI. Because WhereQ owns the collection pipeline, the schema, the ingestion and the API version are one decision instead of three.',
          },
          {
            kind: 'paragraph',
            text: 'It is also the universe\'s AI surface: the MCP server is what lets an agent inside Cursor or Claude query live market data rather than a stale copy of it.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Layer', 'Technology'],
            rows: [
              ['Portal & API', 'FastAPI, Python'],
              ['SDKs', '`pip install whereq.cloud`, `npm install @whereq/cloud` — typed, MIT'],
              ['Storage', 'PostgreSQL, 9 live data feeds across 19 sources'],
              ['Interfaces', 'REST, MCP (stdio + streamable HTTP), browser portal'],
            ],
          },
        ],
      },
    ],
    links: [
      { label: 'API documentation', href: 'https://docs.whereq.cloud/', external: true },
      { label: 'SDKs', href: 'https://whereq.cloud/sdk', external: true },
      { label: 'MCP server', href: 'https://whereq.cloud/mcp', external: true },
    ],
  },
  {
    id: 'keytomarvel',
    collection: 'universe',
    name: 'keytomarvel.com',
    role: 'The Universal Passport',
    tagline: 'One identity across every world.',
    logo: '/img/apps/keytomarvel.png',
    accent: '#F4B33D',
    group: 'foundation',
    question: 'WHO',
    summary:
      'The identity planet. Unified single sign-on, secure identity and access management, social login and MFA. Every product in the universe trusts KeyToMarvel to answer one question: who are you?',
    status: 'Live',
    url: 'https://www.keytomarvel.com',
    capabilities: [
      'Unified single sign-on across every application in the universe.',
      'Secure identity management and access control.',
      'Social login — WeChat, Google — and MFA support.',
      'Profiles and relationships as first-class data.',
      'A Marvel-styled Keycloak theme, published as its own open source project.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'KeyToMarvel is the identity layer of the WhereQ Universe. It runs on Keycloak — the open-source IAM engine — and puts a themed front door on it: realms, clients, users and identity providers under one administration console.',
          },
          {
            kind: 'paragraph',
            text: 'The point is not a login form. It is that an account created once is an account everywhere: sign in to FlowDesk, sign in to chroniq.cc, sign in to the Atlas, and it is the same identity the whole way.',
          },
        ],
      },
      {
        title: 'What it does',
        blocks: [
          {
            kind: 'list',
            items: [
              '**Single sign-on** — one session across every application.',
              '**Identity & access management** — realms, clients, roles and policies.',
              '**Social login** — WeChat and Google identity providers.',
              '**MFA** — a second factor where an application needs one.',
              '**Profiles & relationships** — the user graph the products read.',
              '**Self-service account portal** — users manage their own account, security and connected applications.',
            ],
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'KeyToMarvel is the "WHO" of the universe — the one layer every other application calls before it does anything else. It is what lets qhaul.ca route a driver, chroniq.cc confirm a booking, and whereq.cloud meter an API key against the same person.',
          },
          {
            kind: 'paragraph',
            text: 'The theme itself is open source as `KeyToMarvel.com-theme`, so any Keycloak deployment can wear it.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Layer', 'Technology'],
            rows: [
              ['Engine', 'Keycloak — realms, clients, users, identity providers'],
              ['Realm', '`whereq`'],
              ['Theme', 'Vegeta — a Keycloak theme published as open source'],
              ['Front door', 'Administration console, account portal, community and docs links'],
            ],
          },
        ],
      },
    ],
    links: [
      { label: 'Administration console', href: 'https://keytomarvel.com/admin/', external: true },
      { label: 'Keycloak documentation', href: 'https://www.keycloak.org/documentation', external: true },
    ],
  },
  {
    id: 'whereq-ca',
    collection: 'universe',
    name: 'whereq.ca',
    role: 'The Research Station',
    tagline: 'Where ideas are tested first.',
    logo: '/img/apps/whereq-ca.png',
    accent: '#F46BA9',
    group: 'foundation',
    related: ['react'],
    question: 'WHY',
    summary:
      'The laboratory of the universe — an app hub for experimentation, validation, prototyping and community feedback. Innovations prove themselves here before they reach production. The map of the universe lives here, in the lab.',
    // The repository is public and holds the app's own front end, so the
    // Source link is real. The News page still files this application under
    // Proprietary — the two pages group the universe differently.
    status: 'Live · open source',
    url: 'https://www.whereq.ca',
    repo: 'whereq.ca',
    capabilities: [
      'The app hub — a single front door to every application in the universe.',
      'The universe map, where each application is a planet with its own role and colour.',
      'Experimentation and validation: an idea graduates only after it proves itself here.',
      'Prototyping, community feedback, and the shared design language that follows from it.',
      '@whereq/react — the React component library the lab builds its own interfaces with.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'whereq.ca is the research station. It is where the universe\'s work happens before it ships: prototypes, experiments, the shared component library, and the map that shows how every application fits together.',
          },
          {
            kind: 'paragraph',
            text: 'It is also the front door. Someone who wants to use the universe does not need thirteen URLs — whereq.ca is the one place that lists them, and it is where a new application is announced before it graduates.',
          },
        ],
      },
      {
        title: 'The universe map',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The lab draws the universe as a map of planets, each answering one question of the universe:',
          },
          {
            kind: 'table',
            head: ['Question', 'Planet'],
            rows: [
              ['WHERE', 'whereq.com — the spatial engine'],
              ['WHO', 'keytomarvel.com — the universal passport'],
              ['WHEN', 'chroniq.cc — the temporal engine'],
              ['WHY', 'whereq.ca — the research station'],
              ['WHAT', 'whereq.github.io — mission control'],
              ['HOW', 'the product planets built on the five'],
            ],
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'whereq.ca answers "why" — why a thing exists and whether it should. It is the only application in the universe whose output is not a product but a decision: graduate, iterate, or drop.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'Technology'],
            rows: [
              ['Hub', 'whereq.ca — the app hub and universe map'],
              ['Component library', '@whereq/react — the shared React design system'],
              ['Blog', 'whereq-app-hub'],
              ['Style', 'MetroUI — radius-xs 2px, the family standard'],
            ],
          },
        ],
      },
    ],
    links: [
      { label: 'The lab', href: 'https://www.whereq.ca/lab', external: true },
      { label: '@whereq/react demo', href: '/blog/WhereQ-CA-React-Demo' },
    ],
  },
  {
    id: 'whereq-hub',
    collection: 'universe',
    name: 'whereq.github.io',
    role: 'Mission Control',
    tagline: 'The public voice of the universe.',
    logo: '/img/whereq-logo.png',
    accent: '#4DA8F0',
    group: 'foundation',
    related: ['docusaurus', 'react', 'typescript'],
    question: 'WHAT',
    summary:
      'The broadcast planet — the official voice of the universe. News, announcements, releases, changelogs and ecosystem updates transmit from here to the rest of the world.',
    status: 'Live',
    url: 'https://whereq.github.io',
    repo: 'whereq.github.io-docusaurus',
    capabilities: [
      'The docs hub — a technical knowledge base of roughly 200 engineering posts.',
      'The News page — a curated announcement table for every application in the universe.',
      'The Atlas — this wiki: the universe, the references behind it, and the glossary.',
      'Release announcements written in English and Chinese, as a pair, for every shipped version.',
      'Offline client-side search across the blog, the docs and the pages, in both languages.',
      'KaTeX math rendering throughout the technical posts.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This site is where the universe talks. It is not a mirror of the repositories — it is the edited, published voice: what shipped, why it matters, and how to use it.',
          },
          {
            kind: 'paragraph',
            text: 'The rule the site runs on is that an announcement must be traceable to the application\'s own repository. Versions and dates come from the release tags and changelogs, never from memory, because that is where a reader will check.',
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'Mission Control is the "WHAT" planet: what the universe contains and what it has shipped. It is the only planet whose output is information rather than a service — and the only one the outside world is expected to read.',
          },
          {
            kind: 'paragraph',
            text: 'It is also where this Atlas lives. The Atlas is the reference face of the same voice: one stable page per application, describing what it is, what it does and how it fits.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Layer', 'Technology'],
            rows: [
              ['Framework', 'Docusaurus 3.10, React 19, TypeScript'],
              ['Content', 'MDX — blog posts, docs and wiki pages'],
              ['Math', 'remark-math + rehype-katex'],
              ['Search', '@easyops-cn/docusaurus-search-local — offline, bilingual'],
              ['Comments', 'Giscus, on GitHub Discussions'],
              ['Theme', 'WhereQ dark navy + amber, MetroUI radius-xs'],
            ],
          },
        ],
      },
    ],
    links: [
      { label: 'News', href: '/news' },
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: '/docs/intro/' },
    ],
  },
  {
    id: 'flowdesk',
    collection: 'universe',
    name: 'flowdesk.top',
    role: 'NOVA Command Center',
    tagline: 'Deep stock analysis, powered by AI.',
    logo: '/img/apps/flowdesk.svg',
    accent: '#3FD68F',
    group: 'fintch',
    related: ['postgresql', 'react', 'whereq-cloud'],
    summary:
      'An AI trading platform built on top of all five foundational planets. Structured, intelligent stock analysis and professional-grade market conversations — guided by NOVA, the AI trading guru.',
    status: 'Live · open source',
    url: 'https://flowdesk.top',
    repo: 'FlowDesktop',
    capabilities: [
      'NOVA — a chat-first AI analyst with 34 tools, summoned with ⌘K from anywhere.',
      'Company exploration and deep investment research across 10,000+ stocks.',
      'Real-time data across NYSE, NASDAQ, TSX, SSE and SZSE, with historical prices.',
      'Watchlists, sector views and an intelligence feed.',
      'Agent schedules and proactive insights — the desk pushes, it does not wait to be asked.',
      'A market simulator for paper trading, so a strategy can be tested before it is risked.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'FlowDesk is a desk, not a quote screen. The charts and the prices are the easy half; the other half is NOVA — an assistant that holds the whole context of a company and will walk through the thesis with you, in the language a professional analyst would use.',
          },
          {
            kind: 'paragraph',
            text: 'It is self-hostable, and it is MIT licensed. The market data arrives through the whereq.cloud Data API, so anyone running their own instance gets the same numbers the hosted one sees.',
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'FlowDesk is the first product to sit on the whole stack at once: market data from whereq.cloud, identity from KeyToMarvel, the calendar from chroniq.cc and the location layer from whereq.com. Its own README puts it plainly — "Market data via the whereq.cloud Data API".',
          },
          {
            kind: 'paragraph',
            text: 'Where caijing.today is the Chinese news face of the same data, FlowDesk is the analyst face of it: the same facts, arranged for someone making a decision about a company.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Layer', 'Technology'],
            rows: [
              ['Backend', 'Python, FastAPI, PostgreSQL'],
              ['Front end', 'React'],
              ['AI', 'NOVA chat, 34 tools, agent schedules'],
              ['Licence', 'MIT'],
              ['Deployment', 'Self-hostable'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'caijing',
    collection: 'universe',
    name: 'caijing.today',
    role: 'The Newsroom',
    tagline: '财经今日 — Chinese-first financial news, hot rankings and an economic calendar.',
    logo: '/img/apps/caijing.svg',
    accent: '#0B63CE',
    group: 'fintch',
    related: ['postgresql', 'whereq-cloud'],
    summary:
      'A bilingual finance-news board: hot rankings, a 7×24 newsflash, market panels and search, built Chinese-first. It reads the same published schema contract the rest of the universe uses, and presents the finance data for a Chinese reader without translating it into a different language.',
    status: 'Live · open source',
    url: 'https://caijing.today',
    repo: 'CaiJing-Today',
    capabilities: [
      'Hot rankings (个股热榜) — a blended, cross-source heat ranking of the Chinese market.',
      'A 7×24 newsflash for breaking items, timestamped and prioritised.',
      'Market panels for indices, quotes and sector moves.',
      'An economic calendar of macro releases, with forecasts and prior prints.',
      'Full search across the board, and a bilingual EN / 中文 interface.',
      'A published PostgreSQL schema contract, so a reader can query the same data themselves.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: '财经今日 is the newsroom of the universe. Where most market sites are English-first with a Chinese afterthought, this one is Chinese-first: the heat rankings, the newsflash cadence and the calendar all read the way a Chinese finance desk expects them to.',
          },
          {
            kind: 'paragraph',
            text: 'It is MIT licensed, and it publishes its schema contract rather than hiding it — the FastAPI read API is a documented window onto the same tables the universe itself runs on.',
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'caijing.today is the sibling of FlowDesk: same data spine, different reading. It is the face of the universe for the Chinese market — where caijing.today is the board, flowdesk.top is the analyst desk, and whereq.cloud is the cloud underneath both.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Layer', 'Technology'],
            rows: [
              ['Front end', 'React 19'],
              ['API', 'FastAPI read API'],
              ['Data', 'A published PostgreSQL schema contract'],
              ['Licence', 'MIT'],
            ],
          },
        ],
      },
    ],
    links: [
      { label: 'Open source announcement', href: '/blog/CaiJing-Today-Open-Source-Announcement' },
    ],
  },
  {
    id: 'whereq-com',
    collection: 'universe',
    name: 'whereq.com',
    role: 'The Spatial Engine',
    tagline: 'Every place has a story.',
    logo: '/img/apps/whereq-com.svg',
    accent: '#2DD4BF',
    group: 'geo',
    question: 'WHERE',
    summary:
      'The geospatial core of the universe. Maps, routing, navigation, places and location discovery — built on Google Maps. Many future products depend on it.',
    status: 'Live · open source',
    url: 'https://www.whereq.com',
    repo: 'WhereQ-com',
    capabilities: [
      'Maps and routing, built on Google Maps.',
      'Place discovery — schools, fuel, local news, and the points in between.',
      'Neighbourhood boundaries, drawn as real polygons rather than guessed postal codes.',
      'A crawler that collects the local data, and the schema it writes into.',
      'Location intelligence for the rest of the universe to build on.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'whereq.com is the map of a place. Not a pin on a map — a place understood: the schools near it, the fuel prices around it, the local news that belongs to it, and the boundaries that say which neighbourhood you are actually in.',
          },
          {
            kind: 'paragraph',
            text: 'It is open source, and it ships with the crawler and the schema it reads, so the map can be extended rather than merely consumed.',
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'whereq.com answers "WHERE" — it is the spatial engine the rest of the universe builds on. The universe\'s own data cloud also publishes geography, fuel and cost-of-living datasets under the same conventions, so the map layer and the data layer agree on what a place is.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Layer', 'Technology'],
            rows: [
              ['Mapping', 'Google Maps, GIS'],
              ['Language', 'Python'],
              ['Data', 'Crawler + published schema'],
              ['Licence', 'Open source'],
            ],
          },
        ],
      },
    ],
    links: [
      { label: 'Open source announcement', href: '/blog/WhereQ-com-Open-Source-Announcement' },
    ],
  },
  {
    id: 'chroniq',
    collection: 'universe',
    name: 'chroniq.cc',
    role: 'The Temporal Engine',
    tagline: 'Time, orchestrated.',
    logo: '/img/apps/chroniq.png',
    accent: '#A78BFA',
    group: 'booking',
    question: 'WHEN',
    summary:
      'The time planet. Events, scheduling, booking, appointments and calendar intelligence — the temporal layer the rest of the universe sets its clocks by.',
    status: 'Live',
    url: 'https://chroniq.cc',
    capabilities: [
      'Custom event types — 15-minute intros, hour-long deep dives, paid consultations — each with its own rules.',
      'Personal booking pages: share chroniq.cc/you and let invitees pick a time that works for both of you.',
      'Flexible availability — weekly hours, date overrides, and buffer time between meetings.',
      'Team scheduling — round-robin and collective events that distribute bookings across the team.',
      'Two-way calendar sync with Google and Microsoft, so availability is never stale.',
      'Insights and analytics: booking trends, no-show rates and busiest times.',
      'Stripe for paid bookings, with reminders and follow-ups automated.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'chroniq.cc turns a calendar into a product. Instead of negotiating a time over email, you publish a link; the other side sees your real availability, picks a slot, and everybody ends up with a calendar invite.',
          },
          {
            kind: 'paragraph',
            text: 'The design goal is a calm surface — no back-and-forth, no double bookings, and the kind of booking page you would be happy to send a customer.',
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'chroniq.cc is the "WHEN" of the universe. Every product that needs to put something on a calendar — a qhaul.ca pickup window, a consultation, a team review — can take its time model from the temporal engine instead of inventing one.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Plan', 'Price'],
            rows: [
              ['Free', 'CA$0/mo — 1 event type, unlimited bookings, calendar sync'],
              ['Pro', 'CA$9.99/mo — unlimited event types, automated reminders, branding'],
              ['Team', 'CA$39.99/mo — round-robin and collective events, analytics, SAML SSO'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'Integrations: Google Calendar, Microsoft Outlook and Stripe, with more on the way.',
          },
        ],
      },
    ],
    links: [{ label: 'Pricing and features', href: 'https://chroniq.cc/#pricing', external: true }],
  },
  {
    id: 'qhaul',
    collection: 'universe',
    name: 'qhaul.ca',
    role: 'The Freight Engine',
    tagline: 'Need it moved? QHaul it.',
    logo: '/img/apps/qhaul.png',
    accent: '#FD5E02',
    group: 'logistics',
    summary:
      'The logistics planet. A B2B marketplace connecting Canadian businesses with local driver supply — freight, courier and small moves across the GTA and beyond. Customer organisations, a driver portal, admin tooling and mobile apps, all riding on the shared identity, location and time foundations.',
    status: 'Live',
    url: 'https://qhaul.ca',
    capabilities: [
      'Four services on one platform: moving (apartments and single items), delivery (same-day courier), hauling (junk and appliance removal) and second-hand pickup from Kijiji, Facebook Marketplace and auctions.',
      'An instant quote — pick-up and drop-off addresses, a time window, a vehicle, and a price you can see before you commit.',
      'Live tracking: the driver\'s location, the licence plate and the estimated arrival, for the whole job.',
      'Local drivers, not an algorithm — people who know the buildings, the gates and the loading rules of the neighbourhoods they work.',
      'Business accounts: Net 15 / Net 30 invoicing, tiered bulk pricing, a REST API and webhooks.',
      'A trilingual interface — 中文, English and Français.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'QHaul is a freight marketplace for the GTA, and the part that matters is who drives it. The supply side is local: the same drivers take the small move, the appliance pickup and the same-day courier, because they already know the area.',
          },
          {
            kind: 'paragraph',
            text: 'From the customer side it is a three-step job — addresses and time, vehicle and price, driver and live tracking — with the tracking staying visible from acceptance to drop-off.',
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'QHaul is the clearest case of the universe\'s shared layers doing real work: KeyToMarvel signs the customer and the driver in, whereq.com resolves and displays the addresses, and chroniq.cc owns the booking window and dispatch scheduling.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'Technology'],
            rows: [
              ['Marketplace', 'Customer organisations + driver portal + admin tooling'],
              ['Mobile', 'Driver app with live position reporting'],
              ['Payments', 'Stripe; Net 15 / Net 30 business invoicing'],
              ['Integration', 'REST API and webhooks'],
              ['Languages', '中文, English, Français'],
            ],
          },
        ],
      },
    ],
    links: [
      { label: 'Get a quote', href: 'https://qhaul.ca/quote', external: true },
      { label: 'Drive with us', href: 'https://qhaul.ca/drive', external: true },
    ],
  },
  {
    id: 'catobigato',
    collection: 'universe',
    name: 'catobigato.com',
    role: 'The Knowledge Galaxy',
    tagline: 'Your chubby cat tutor, K-12 to college.',
    logo: '/img/apps/catobigato.png',
    accent: '#F47B6B',
    group: 'learning',
    summary:
      'The learning planet. Vibe tutoring that combines learning, visualization, social interaction and AI — built for K-12 students and expandable to every age.',
    status: 'Live',
    url: 'https://www.catobigato.com',
    capabilities: [
      'Chat-first tutoring with Catobi — attach a knowledge base, keep memory across sessions, ask in plain English.',
      'TutorBot specialists per subject, and Co-Writer for drafting essays.',
      'A calculator with six modes, from arithmetic through symbolic calculus, with saveable user-defined functions.',
      'Live animated SVG visualisation across mathematics, physics, chemistry, biology, literacy and the arts — rendered in the browser.',
      'Question sets, practice, timed exams, corrections and reports; notes as one quiet record.',
      'Puzzles — browse a curated bank or design and share your own, version-controlled and exportable.',
      'Study together: friends, study groups, messages, activity feed and opt-in leaderboards.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'CatoBigato is a study companion that behaves like a good teacher rather than a search box. You snap a worksheet or type a question in your own words, and Catobi works out what is actually being asked, shows the reasoning, then quizzes you back.',
          },
          {
            kind: 'paragraph',
            text: 'The important detail is that every mode shares the same memory of you. A chat, a TutorBot, an essay draft and a book you are reading all sit in the same window, so the assistant is continuous rather than a series of fresh tabs.',
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The learning planet is where the universe\'s AI work shows up as a product rather than a platform. The same identity layer signs a student in across the tutor, the games and the shared calendar; the Luca engine that powers it is open source.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Layer', 'Technology'],
            rows: [
              ['Interface', 'Chat, TutorBot, Co-Writer, book reader, knowledge base, memory'],
              ['Compute', 'Six-mode calculator with symbolic maths and live graphing'],
              ['Visualisation', 'Animated SVG, rendered in the browser — fast and offline-friendly'],
              ['Practice', 'Question sets, timed exams, corrections, statistics and reports'],
              ['Engine', 'Luca — open source'],
            ],
          },
          {
            kind: 'paragraph',
            text: 'Scale on the site today: 12+ subjects from grade school to graduate level, roughly 73,000 problems solved, and a 4.9/5 average student rating.',
          },
        ],
      },
    ],
    links: [
      { label: 'Developers', href: 'https://catobigato.com/developers', external: true },
    ],
  },
  {
    id: 'whereq-cc',
    collection: 'universe',
    name: 'whereq.cc',
    role: 'The Private Gallery',
    tagline: 'A photo vault that stays in your browser.',
    logo: '/img/apps/whereq-cc.png',
    accent: '#D946EF',
    group: 'media',
    summary:
      'The strictly-local photo planet. Your originals live encrypted in your own browser and never leave it — while on-demand AI can enhance, describe and animate a single image whenever you ask.',
    status: 'Live',
    url: 'https://whereq.cc',
    capabilities: [
      'Client-side encryption with AES-256-GCM, keyed from a passphrase only you hold — the browser holds the cipher, the server never sees it.',
      'Albums, tags and search by filename, with grid, list and timeline views.',
      'On-demand enhancement — upscale, denoise, auto-enhance, restyle — applied when you ask, not by default.',
      'A gallery that is never saved on a server: the originals live in your browser.',
      'Qiro, the red panda who holds the key.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'whereq.cc is a photo gallery with a different default. Most galleries upload your pictures to somebody else\'s disk. This one keeps them in your browser, encrypted with a key derived from your passphrase, and the server stores nothing it could read.',
          },
          {
            kind: 'paragraph',
            text: 'The AI is deliberately on-demand and per-image: you ask for an upscale or a restyle of one photograph, and it happens to that photograph — the rest of your library is untouched.',
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This is the universe\'s privacy planet. It takes the identity layer as a given — you sign in — and then keeps the interesting part, the data, entirely on your side of the wire.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'Technology'],
            rows: [
              ['Encryption', 'AES-256-GCM, passphrase-derived key, client side'],
              ['Storage', 'The browser — the gallery is never saved to a server'],
              ['Features', 'Albums, tags, filename search, grid / list / timeline views'],
              ['AI', 'On-demand upscale, denoise, auto-enhance and restyle'],
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'whereq-dosbox',
    collection: 'universe',
    name: 'whereq-dosbox',
    role: 'The Time Machine',
    tagline: 'A complete DOS emulator built natively for Android.',
    logo: '/img/apps/whereq-dosbox.png',
    accent: '#F5C518',
    group: 'retro',
    summary:
      'WhereQ-DOSBox is a complete DOS emulator built natively for Android. The emulator core runs as libdosbox.so inside an APK — not in a browser — so it plays most vintage DOS games and software on the phone itself, with the sound chips and the whole machine included in a save state.',
    // No hosted instance: the APK is built from the repository, so this
    // entry carries a Source button only.
    status: 'Build from source',
    repo: 'whereq-dosbox',
    capabilities: [
      'The DOSBox r4305 / SDL2 core compiled as a native shared library, running inside the APK.',
      'Install a .zip bundle, press Play, and the emulator boots into it.',
      'Save states that capture the entire machine — sound chips included — and resume later, even after the app was killed.',
      'A two-pad on-screen keyboard with touch mouse input, built into the app rather than bolted on.',
      'A bundle launcher for organising and starting game bundles.',
      'An NDK/CMake build with a no-Gradle APK packager, a desktop baseline and a rootless toolchain.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'This is yesterday\'s computing, running natively on today\'s hardware. The difference matters: because the emulator is a real native library inside the app, it is not a browser with a keyboard overlay — the touch layer is part of the port, and a save state freezes the whole machine, sound chips and all.',
          },
          {
            kind: 'paragraph',
            text: 'The Android migration is complete. The emulator core, the app layer, the bundle launcher, the save states and the build pipeline are all in place and verified; what remains is maintenance.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'Technology'],
            rows: [
              ['Core', 'DOSBox r4305, ported to Android, built with NDK + CMake'],
              ['Packaging', 'libdosbox.so inside the APK — a no-Gradle APK packager'],
              ['Rendering', 'SDL2'],
              ['Language', 'C++'],
              ['Licence', 'GPLv2'],
            ],
          },
        ],
      },
      {
        title: 'Getting started',
        blocks: [
          {
            kind: 'paragraph',
            text: 'The user guide walks through installing the app, installing a game, playing it, saving a state and keeping saves safe — one step at a time, with a screenshot of every screen. No DOS knowledge needed.',
          },
        ],
      },
    ],
    links: [
      { label: 'User guide', href: '/blog/WhereQ-DOSBox-User-Guide' },
      { label: 'Milestone announcement', href: '/blog/WhereQ-DOSBox-Milestone' },
    ],
  },
  {
    id: 'ccbus',
    collection: 'universe',
    name: 'ccbus.cc',
    role: 'The DeFi Engine',
    tagline: 'An all-in-one Web3 toolkit.',
    logo: '/img/apps/ccbus.png',
    accent: '#F08A4B',
    group: 'web3',
    summary:
      'The crypto planet. Custom token creation with 11+ tokenomics models, presale launches, liquidity management and wallet tools — across BSC, Ethereum and Polygon.',
    status: 'Live',
    url: 'https://ccbus.cc',
    capabilities: [
      '71 tools, 13 connected chains and 12 token types, with more than 2,100 deployments made through the platform.',
      'Token creation — standard, dividend, compounding, LP-dividend, referral, burn, multi-function, and the 314 transfer-is-trade protocol.',
      'A presale centre: standard Mint, Mint-with-pool and Mint-with-donation.',
      'A liquidity console and a lock console — create, repair and analyse pools, and lock LP to prove a point.',
      'Wallet tools: bulk wallet generation, bulk transfers, collection to a target, and vanity addresses.',
      'Cross-chain bridges — exchange plus LayerZero, an oracle-driven bridge, and a configurable fast bridge.',
      'Trading and market management: the T800 and T1000 bots, contract verification and a contract inspector.',
      'A full Solana suite — SPL and Token-2022 tokens, Raydium AMM / CPMM / CLMM pools, OpenBook market IDs, pump.fun and LetsBonk launches.',
    ],
    sections: [
      {
        title: 'What it is',
        blocks: [
          {
            kind: 'paragraph',
            text: 'CCBus is the Web3 workbench of the universe. Instead of a dozen single-purpose dApps, it puts the whole token lifecycle in one place: create the token, run the presale, add liquidity, lock it, watch the market, and clean up the wallets afterwards.',
          },
          {
            kind: 'paragraph',
            text: 'The tool count is the point — 71 of them, spanning BSC, Ethereum, Polygon, Tron and Solana, with Buzz, the AI assistant, sitting alongside them.',
          },
        ],
      },
      {
        title: 'How it fits the universe',
        blocks: [
          {
            kind: 'paragraph',
            text: 'CCBus is the universe\'s most self-contained planet: its own contracts, its own chain coverage, its own market dashboards. It shares the identity layer with the rest of the universe, and it reads the same kind of live market data the FinTech products do — but the value it creates is on-chain, not in a chart.',
          },
        ],
      },
      {
        title: 'Under the hood',
        blocks: [
          {
            kind: 'table',
            head: ['Piece', 'Technology'],
            rows: [
              ['Chains', 'BSC, Ethereum, Polygon, Tron, Solana and more — 13 connected'],
              ['Contracts', 'Solidity token factories with 11+ tokenomics models'],
              ['Bridges', 'Exchange + LayerZero, oracle bridge, configurable fast bridge'],
              ['Automation', 'T800 and T1000 trading bots; pump.fun and LetsBonk bundlers'],
              ['Interface', '71 tools, 中文 / English, with the Buzz AI assistant'],
            ],
          },
        ],
      },
    ],
    links: [{ label: 'Buzz — the AI assistant', href: 'https://ccbus.cc/buzz', external: true }],
  },
];

/**
 * The six questions. Each one has an owner — the application whose job it
 * is to answer that question for the rest of the universe.
 */
export const UNIVERSE_QUESTIONS: AtlasQuestion[] = [
  {
    mark: 'WHERE',
    text: 'Maps, routing, places and neighbourhood boundaries — where things are.',
    entryId: 'whereq-com',
  },
  {
    mark: 'WHO',
    text: 'One passport, one identity, every application in the universe.',
    entryId: 'keytomarvel',
  },
  {
    mark: 'WHEN',
    text: 'The real calendar — holidays, lunar dates, weather and availability.',
    entryId: 'chroniq',
  },
  {
    mark: 'WHY',
    text: 'Where an idea is tested before it is allowed to graduate.',
    entryId: 'whereq-ca',
  },
  {
    mark: 'WHAT',
    text: 'What the universe has shipped, written up and published.',
    entryId: 'whereq-hub',
  },
  {
    mark: 'HOW',
    text: 'One centralized data cloud that every application reads from.',
    entryId: 'whereq-cloud',
  },
];

/** The introduction to the universe — the opening of its collection. */
export const UNIVERSE_INTRO: {
  title: string;
  standfirst: string;
  sections: AtlasSection[];
} = {
  title: 'The WhereQ Universe',
  standfirst:
    'A family of applications built on one spine: a centralized data cloud that collects the data, stores it, and publishes it to everything above it. Nothing in the universe scrapes the world on its own.',
  sections: [
    {
      title: 'One cloud, thirteen worlds',
      blocks: [
        {
          kind: 'paragraph',
          text: 'The WhereQ Universe is a set of applications that share a single spine. whereq.cloud owns the schema, runs the collectors that fill it, and publishes it through one versioned API. The applications above it read from that contract instead of building their own.',
        },
        {
          kind: 'paragraph',
          text: 'That is the whole idea. A market-news desk, a freight platform, a tutoring companion and a photo vault are not four unrelated products that happen to share a name — they are four readers of the same database, each one shaped around a different question a person actually asks.',
        },
      ],
    },
    {
      title: 'How the universe fits together',
      blocks: [
        {
          kind: 'paragraph',
          text: 'It divides into three layers.',
        },
        {
          kind: 'list',
          items: [
            'The foundation — the data platform (whereq.cloud), the identity layer (keytomarvel.com), the research station (whereq.ca), and this site, the universe\'s public voice.',
            'The engines — the spatial engine (whereq.com) and the temporal engine (chroniq.cc), which own geography and time respectively.',
            'The products — flowdesk.top, caijing.today, qhaul.ca, catobigato.com, whereq.cc, whereq-dosbox and ccbus.cc: each one a finished thing a person can open and use.',
          ],
        },
        {
          kind: 'paragraph',
          text: 'The layering is what keeps the universe honest. A product can change its interface without anyone touching the data, and the data can be corrected once, everywhere, without shipping six patches.',
        },
      ],
    },
    {
      title: 'How to read this atlas',
      blocks: [
        {
          kind: 'paragraph',
          text: 'Every application has one page here, and every page has the same shape: what it is, what it does, how it fits the universe, and what is under the hood. The pages are written to be read in any order.',
        },
        {
          kind: 'paragraph',
          text: 'Start with the six questions below, then use the tree on the left to jump to any application. Each page opens with a summary card — its role, its status, what it can do, and where to go next — so you can tell in ten seconds whether it is the one you are looking for.',
        },
      ],
    },
  ],
};

