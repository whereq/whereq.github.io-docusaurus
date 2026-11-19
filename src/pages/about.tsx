import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import { FaPhone } from 'react-icons/fa';
import { AppCategory, OPEN_SOURCE_APPS, PROPRIETARY_APPS } from '../data/news';
import styles from './about.module.css';

type TocItem = {
  id: string;
  label: string;
  children?: TocItem[];
};

/** One role in the career history. */
type Job = {
  company: string;
  url?: string;
  title: string;
  period: string;
  summary: string;
  achievements: string[];
  /** Earlier work, kept but collapsed so the headline stays readable. */
  earlier?: string[];
  stack: string;
};

const tocItems: TocItem[] = [
  { id: 'intro', label: 'Introduction' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Core Skills' },
  {
    id: 'projects',
    label: 'Projects',
    children: [
      { id: 'foundation', label: 'Foundation' },
      { id: 'fintch', label: 'FinTech & Markets' },
      { id: 'geo', label: 'Geo & Location' },
      { id: 'booking', label: 'Booking & Scheduling' },
      { id: 'logistics', label: 'Logistics & Moving' },
      { id: 'learning', label: 'AI Learning & Tutoring' },
      { id: 'media', label: 'Private Media & AI Tagging' },
      { id: 'retro', label: 'Retro Computing' },
      { id: 'web3', label: 'Web3 & DeFi' },
    ],
  },
];

/**
 * Two applications that belong to the universe but are not on the News page:
 * whereq.cc — the private, browser-encrypted photo vault — and this site
 * itself, the universe's public voice. They are declared here so the
 * portfolio stays the complete picture.
 */
const GALLERY_APP: AppCategory = {
  id: 'whereq-cc',
  name: 'whereq.cc',
  role: 'The Private Gallery',
  tagline:
    'A self-encrypted photo vault that lives in your browser — AES-256-GCM with a key only you hold, plus AI tagging and enhancement.',
  url: 'https://whereq.cc',
  logo: '/img/apps/whereq-cc.png',
  accent: '#d946ef',
  announcements: [],
};

const HUB_APP: AppCategory = {
  id: 'whereq-hub',
  name: 'whereq.github.io',
  role: 'Mission Control',
  tagline:
    'The public voice of the universe — this site: engineering writing, release notes and the announcement hub for every application.',
  url: 'https://whereq.github.io',
  repo: 'whereq.github.io-docusaurus',
  logo: '/img/whereq-logo.png',
  accent: '#f5a623',
  announcements: [],
};

/** A titled group of applications in the portfolio. */
type ProjectGroup = {
  id: string;
  title: string;
  blurb: string;
  apps: AppCategory[];
};

/** Every application the universe knows about, by id. */
const ALL_APPS: AppCategory[] = [...OPEN_SOURCE_APPS, ...PROPRIETARY_APPS];

/** Look an application up by id — a missing one is a build error, not a blank card. */
function app(id: string): AppCategory {
  const found = ALL_APPS.find((a) => a.id === id);
  if (!found) {
    throw new Error(`Unknown application: ${id}`);
  }
  return found;
}

/**
 * The universe, grouped the way a reader thinks about it: the shared
 * foundation first, then one group per domain.
 */
const projectGroups: ProjectGroup[] = [
  {
    id: 'foundation',
    title: 'The Foundation',
    blurb:
      'One centralized data cloud, one identity layer, one front door and one public voice — every application below is built on these.',
    apps: [app('whereq-cloud'), app('keytomarvel'), app('whereq-ca'), HUB_APP],
  },
  {
    id: 'fintch',
    title: 'FinTech & Markets',
    blurb:
      'Research, news and market data — both products read the same centralized data cloud.',
    apps: [app('flowdesk'), app('caijing')],
  },
  {
    id: 'geo',
    title: 'Geo & Location',
    blurb:
      'Maps, routing, places and neighbourhood boundaries — the geospatial core the rest of the universe builds on.',
    apps: [app('whereq-com')],
  },
  {
    id: 'booking',
    title: 'Booking & Scheduling',
    blurb:
      'Scheduling that respects the real calendar — holidays, lunar dates, weather and 8 languages.',
    apps: [app('chroniq')],
  },
  {
    id: 'logistics',
    title: 'Logistics & Moving',
    blurb:
      'An Uber-style moving, delivery and haulage platform, with local drivers across the GTA.',
    apps: [app('qhaul')],
  },
  {
    id: 'learning',
    title: 'AI Learning & Tutoring',
    blurb:
      'A cat tutor for K-12 to college that listens, thinks and shows the work — explanations, quizzes and graphs.',
    apps: [app('catobigato')],
  },
  {
    id: 'media',
    title: 'Private Media & AI Tagging',
    blurb:
      'A gallery encrypted in the browser — the server never sees the key, the photos or the originals.',
    apps: [GALLERY_APP],
  },
  {
    id: 'retro',
    title: 'Retro Computing',
    blurb:
      'A complete DOS emulator built natively for Android — the emulator core runs inside an APK, and it plays most vintage DOS games and software.',
    apps: [app('whereq-dosbox')],
  },
  {
    id: 'web3',
    title: 'Web3 & DeFi',
    blurb:
      'A bridge, a swap desk and the Buzz AI assistant — cross-chain everything, in one toolkit.',
    apps: [app('ccbus')],
  },
];

const experience: Job[] = [
  {
    company: 'WhereQ Inc.',
    url: 'https://www.whereq.com',
    title: 'Owner',
    period: '2020 – Present',
    summary:
      'Founder of WhereQ Inc., where I design the architecture of the WhereQ Universe — one centralized data cloud that serves every application in it, and a family of products across FinTech, geo technology, booking, logistics, learning, private media and retro computing.',
    achievements: [
      'Designed the architecture of the universe: one centralized data cloud (whereq.cloud) — a versioned, metered API and MCP server over 25M+ named records — serving every application below.',
      'Built the FinTech products on top of that cloud: flowdesk.top (NOVA, the AI market-research analyst) and caijing.today (Chinese-first financial news, hot rankings and an economic calendar).',
      'Built whereq.com, the geo technology layer: maps, routing, places and neighbourhood boundaries — plus the crawler and the schema it reads.',
      'Built chroniq.cc, a scheduling engine that respects holidays, lunar dates, weather and 8 languages.',
      'Built qhaul.ca, an Uber-style moving, delivery and haulage platform running on local drivers across the GTA.',
      'Built catobigato.com, an AI tutoring assistant for K-12 to college that explains, quizzes and graphs its work.',
      'Built whereq.cc, a self-encrypted photo vault with AI tagging and enhancement — the key never leaves the device.',
      'Built whereq-dosbox, a complete DOS emulator built natively for Android: the emulator core runs as libdosbox.so inside an APK, and it plays most vintage DOS games and software.',
      'Shipped keytomarvel.com as the identity layer every application signs in through, whereq.ca as the research station where ideas are tested before they graduate, and this site as the universe’s public voice.',
    ],
    earlier: [
      'Implemented a Java client to interface with TREB MLS for pulling selling data based on the IDX protocol.',
      'Constructed a scheduled batch service to retrieve selling data and display it on an integrated Google Map website.',
      'Designed and implemented a proprietary image compression algorithm to reduce Amazon S3 costs.',
      'Developed a ChatGPT-like console with categorized prompts and integrated Google Social Login.',
      'Built comprehensive API sets using Spring WebFlux for efficient communication with OpenAI endpoints.',
      'Established tech stack using jHipster, React, Spring WebFlux, PostgreSQL, and Keycloak.',
      'Orchestrated infrastructure setup on AWS EC2 and RDS for production services.',
    ],
    stack: 'Amazon EC2, RDS, S3, Spring WebFlux, React, Keycloak, Angular, GIS, Google Map, MapStruct, Git, CI/CD, Social Login',
  },
  {
    company: 'Scotiabank',
    title: 'Lead Engineer',
    period: '04/2019 – Present',
    summary:
      'Tech leader and solution architect for the BNS data platform — big data streaming, metric collection, performance tuning and automation — and for the enterprise AI initiatives built on top of it.',
    achievements: [
      'Led the architecture and delivery of enterprise AI initiatives, including Data GPT and internal GenAI enablement platforms, achieving the 90-90 KPI — 90% query accuracy, with 90% of queries answered within 30 seconds.',
      'Built Data GPT, an AI-powered query platform using OpenAI’s GPT-3.5 Turbo model to deliver accurate and efficient data retrieval for enterprise-grade analytics.',
      'Evaluated and integrated emerging AI technologies, establishing reusable frameworks and best practices for enterprise adoption.',
      'Designed and implemented "Spark as a Service" and an Avro/JSON flattener service.',
      'Developed lightweight scaffolding using Spring Boot, R2DBC, and MapStruct to simplify API development.',
      'Led end-to-end solution design for data consumption using Presto, connecting HDFS, ElasticSearch, and PostgreSQL.',
      'Developed ElasticSearch metrics tools and centralized business calendar services using Node.js and PostgreSQL.',
      'Reengineered Credit 360 application, improving performance, codebase, and validation frameworks.',
    ],
    stack: 'Kubernetes, Docker, Presto, Spark, Kafka, HDFS, ElasticSearch, Power BI, Java, Spring Boot, Angular, MongoDB, Jenkins, PostgreSQL, OpenAI GPT-3.5, GenAI, Git',
  },
  {
    company: 'TD Bank',
    title: 'Senior Software Developer',
    period: '11/2018 – 04/2019',
    summary:
      'Developed new features and contributed to the EasyApply program, focusing on Java backend systems and automated testing frameworks.',
    achievements: [
      'Introduced POJO generation from JSON schemas for validation purposes.',
      'Developed a retry module using Java 8 Functional Interfaces and the template method design pattern.',
      'Built 10 new API endpoints within three months and refactored existing components.',
    ],
    stack: 'Java, Spring, Oracle 12c, Jenkins, Postman, MQ, Git, Hibernate',
  },
  {
    company: 'Rogers Communications Inc.',
    title: 'Senior Software Developer',
    period: '08/2016 – 09/2018',
    summary:
      'Full-stack developer and architect leading the evolution of the Enterprise Notification System (ENS), improving performance and introducing new features.',
    achievements: [
      'Integrated an SMS Gateway using SMPP protocol to enhance SMS delivery performance.',
      'Re-architected the ENS for better scalability, handling over a million email notifications per hour.',
      'Introduced RESTful interfaces and optimized system performance.',
    ],
    stack: 'SMPP, Spring, Hibernate, WebLogic, Oracle, JUnit, Ant, Jenkins, SVN',
  },
  {
    company: 'Citibank',
    title: 'Senior Consultant',
    period: '09/2012 – 08/2016',
    summary:
      'Collaborated with teams across the U.S. and India, leading multiple Java-based development projects for the Market Risk department.',
    achievements: [
      'Developed portfolio management and reporting applications using Adobe Flex and Java.',
      'Built a report transformation engine using JEXL and designed batch jobs for intraday feed processing.',
      'Migrated Flex applications to single-page applications using ExtJS and Spring Boot.',
    ],
    stack: 'Java, JMS, Kafka, Jenkins, ExtJS, Spring Boot, Hibernate, Oracle, AWS',
  },
  {
    company: 'Rogers Communications Inc.',
    title: 'Senior Programmer Analyst',
    period: '07/2010 – 07/2012',
    summary:
      'Collaborated with project stakeholders to develop and deliver applications supporting business needs.',
    achievements: [
      'Enhanced the ENS to support MMS delivery.',
      'Developed SMS/MMS template generators using Apache Velocity and Java Regex.',
    ],
    stack: 'Java, Adobe LiveCycle, Oracle, Spring, Hibernate, WebLogic',
  },
];

/** The technical toolkit behind the work, grouped the way it gets used. */
const skills: { title: string; items: string[] }[] = [
  {
    title: 'Languages & Frameworks',
    items: ['Java', 'Spring Boot', 'Spring WebFlux', 'Python', 'TypeScript', 'React', 'Node.js', 'Angular'],
  },
  {
    title: 'Data, Streaming & Storage',
    items: ['Apache Spark', 'Kafka', 'HDFS', 'Presto', 'Avro', 'Parquet', 'PostgreSQL', 'MongoDB', 'ElasticSearch', 'Oracle'],
  },
  {
    title: 'AI & GenAI',
    items: ['OpenAI GPT-3.5 / GPT-4', 'GenAI enablement platforms', 'MCP servers', 'AI agents', 'ChatGPT-style consoles'],
  },
  {
    title: 'Cloud & Platform',
    items: ['Kubernetes', 'Docker', 'AWS — EC2, RDS, S3', 'Jenkins', 'Git', 'CI/CD', 'Linux'],
  },
  {
    title: 'Product Engineering',
    items: ['Android — NDK, CMake', 'Keycloak / IAM', 'REST APIs & SDKs', 'GIS & Google Maps', 'Docusaurus', 'Power BI'],
  },
];

/** Every id the table of contents watches. */
const tocIds: string[] = tocItems.flatMap((item) => [
  item.id,
  ...(item.children ?? []).map((child) => child.id),
]);

function TableOfContents({ activeId }: { activeId: string }) {
  return (
    <nav className={styles.toc}>
      <p className={styles.tocTitle}>On this page</p>
      <ul className={styles.tocList}>
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${styles.tocLink} ${activeId === item.id ? styles.tocLinkActive : ''}`}
            >
              {item.label}
            </a>
            {item.children && (
              <ul className={styles.tocList}>
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className={`${styles.tocLink} ${styles.tocLinkChild} ${
                        activeId === child.id ? styles.tocLinkActive : ''
                      }`}
                    >
                      {child.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** One application in the portfolio: its mark, its role, its story, its links. */
function ProjectCard({ app }: { app: AppCategory }) {
  return (
    <div className={styles.projectCard}>
      <span className={styles.logoTile}>
        <img src={app.logo} alt="" className={styles.projectLogo} />
      </span>
      <div className={styles.projectInfo}>
        <div className={styles.projectNameRow}>
          <span className={styles.projectName}>{app.name}</span>
          {app.role && <span className={styles.projectRole}>{app.role}</span>}
          {app.repo && <span className={styles.projectBadge}>Open source</span>}
        </div>
        <span className={styles.projectDesc}>{app.tagline}</span>
      </div>
      <div className={styles.projectLinks}>
        {app.url && (
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.projectLink} ${styles.projectLinkPrimary}`}
          >
            Open app
          </a>
        )}
        {app.repo && (
          <a
            href={`https://github.com/whereq/${app.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.projectLink}
          >
            Source
          </a>
        )}
      </div>
    </div>
  );
}

export default function About(): React.JSX.Element {
  const [activeId, setActiveId] = useState('intro');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );

    tocIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const appCount = projectGroups.reduce((sum, group) => sum + group.apps.length, 0);
  const openSourceCount = projectGroups.reduce(
    (sum, group) => sum + group.apps.filter((a) => a.repo).length,
    0,
  );

  return (
    <Layout title="About" description="About Dazhi Zhang (Tony) — Engineering Leader, AI Architect and Software Architect">
      <div className={styles.layout}>

        {/* ── Main content ───────────────────────────────────── */}
        <main className={styles.content}>

          {/* Hero */}
          <section id="intro" className={styles.hero}>
            <div className={styles.heroInner}>
              <img
                src="/img/mascot.png"
                alt="Dazhi Zhang (Tony)"
                className={styles.avatar}
              />
              <div className={styles.heroText}>
                <h1 className={styles.heroName}>Dazhi Zhang (Tony)</h1>
                <p className={styles.heroTitle}>Senior Software Developer · Engineering Leader · AI Architect</p>
                <p className={styles.heroTagline}>Time can fade everything</p>
                <div className={styles.heroContact}>
                  <span><FaPhone className={styles.heroPhone} /> (416) ***-****</span>
                  <span>✉️ <a href="mailto:googol.zhang@gmail.com">googol.zhang@gmail.com</a></span>
                </div>
              </div>
            </div>
            <p className={styles.heroBio}>
              A well-qualified software developer, a fast learner, a highly motivated
              self-starter, and a reliable person to work with.
            </p>
            <p className={styles.heroBio}>
              I design the architecture of enterprise data and AI platforms at Scotiabank,
              and outside the enterprise I build the WhereQ Universe — one centralized data
              cloud serving a family of applications across FinTech, geo technology,
              booking, logistics, learning, private media and retro computing.
            </p>
          </section>

          {/* Experience */}
          <section id="experience" className={styles.section}>
            <h2 className={styles.sectionTitle}>Professional Experience</h2>
            <div className={styles.timeline}>
              {experience.map((job, i) => (
                <div key={i} className={styles.job}>
                  <div className={styles.jobHeader}>
                    <h3 className={styles.jobCompany}>
                      {job.url
                        ? <a href={job.url} target="_blank" rel="noopener noreferrer">{job.company}</a>
                        : job.company}
                    </h3>
                    <p className={styles.jobMeta}>{job.title} &nbsp;·&nbsp; {job.period}</p>
                  </div>
                  <p className={styles.jobSummary}>{job.summary}</p>
                  <ul className={styles.jobAchievements}>
                    {job.achievements.map((a, j) => <li key={j}>{a}</li>)}
                  </ul>
                  {job.earlier && (
                    <details className={styles.jobEarlier}>
                      <summary>Earlier platform work</summary>
                      <ul className={styles.jobAchievements}>
                        {job.earlier.map((a, j) => <li key={j}>{a}</li>)}
                      </ul>
                    </details>
                  )}
                  <p className={styles.jobStack}><strong>Stack:</strong> {job.stack}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section id="skills" className={styles.section}>
            <h2 className={styles.sectionTitle}>Core Technical Skills</h2>
            <p className={styles.sectionBlurb}>
              Fourteen years of production delivery across banking, media, logistics and
              consumer software — this is the toolkit behind the work below.
            </p>
            <div className={styles.skillGrid}>
              {skills.map((group) => (
                <div key={group.title} className={styles.skillGroup}>
                  <h3 className={styles.skillTitle}>{group.title}</h3>
                  <ul className={styles.skillList}>
                    {group.items.map((item) => (
                      <li key={item} className={styles.skillChip}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className={styles.section}>
            <h2 className={styles.sectionTitle}>The WhereQ Universe</h2>
            <p className={styles.sectionBlurb}>
              Every application below is one I designed, built and shipped. They are not a
              list of clients — they are one ecosystem: a centralized data cloud at the
              centre, an identity layer underneath it, and products on top that share one
              release cadence.
            </p>

            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt>Applications</dt>
                <dd>{appCount}</dd>
              </div>
              <div className={styles.stat}>
                <dt>Open source</dt>
                <dd>
                  {openSourceCount}
                  <span className={styles.statMeta}>of {appCount}</span>
                </dd>
              </div>
              <div className={styles.stat}>
                <dt>Building since</dt>
                <dd>2012</dd>
              </div>
            </dl>

            {projectGroups.map((group) => (
              <section key={group.id} className={styles.group} aria-labelledby={group.id}>
                <h3 className={styles.groupTitle} id={group.id}>
                  {group.title}
                </h3>
                <p className={styles.groupBlurb}>{group.blurb}</p>
                <div className={styles.projects}>
                  {group.apps.map((app) => (
                    <ProjectCard key={app.id} app={app} />
                  ))}
                </div>
              </section>
            ))}
          </section>

        </main>

        {/* ── TOC sidebar ────────────────────────────────────── */}
        <aside className={styles.tocAside}>
          <TableOfContents activeId={activeId} />
        </aside>

      </div>
    </Layout>
  );
}
