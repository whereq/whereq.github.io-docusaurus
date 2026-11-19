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

const tocItems: TocItem[] = [
  { id: 'intro', label: 'Introduction' },
  { id: 'experience', label: 'Experience' },
  {
    id: 'projects',
    label: 'Projects',
    children: [
      { id: 'open-source', label: 'Open Source' },
      { id: 'products', label: 'Products' },
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
    'A photo vault that stays in your browser — encrypted locally with AES-256-GCM, organised into albums and tags, with on-demand AI enhancement.',
  url: 'https://whereq.cc',
  logo: '/img/whereq-cc.png',
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
  logo: '/img/logo.svg',
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

const projectGroups: ProjectGroup[] = [
  {
    id: 'open-source',
    title: 'Open Source',
    blurb: 'Every one of these ships its source publicly — read it, fork it, run it yourself.',
    apps: [...OPEN_SOURCE_APPS, HUB_APP],
  },
  {
    id: 'products',
    title: 'Products',
    blurb: 'The products themselves. Their source is not public, so there is no Source link.',
    apps: [...PROPRIETARY_APPS, GALLERY_APP],
  },
];

const experience = [
  {
    company: 'WhereQ Inc.',
    url: 'https://www.whereq.com',
    title: 'Owner',
    period: '2020 – Present',
    summary:
      'Founder of WhereQ Inc., building the WhereQ Universe — an ecosystem of applications that share one data platform, one identity layer and one release cadence, with OpenAI integration and practical AI throughout.',
    achievements: [
      'Built the WhereQ Universe: a shared data platform, a unified identity layer, and an open-source core whose releases are published as announcements on this site.',
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
  const openSourceCount = projectGroups[0].apps.length;

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
              By day I lead enterprise data and AI platforms; the rest of the time I
              build the WhereQ Universe — a family of applications that share one data
              platform, one identity layer and one release cadence.
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
                  <p className={styles.jobStack}><strong>Stack:</strong> {job.stack}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className={styles.section}>
            <h2 className={styles.sectionTitle}>The WhereQ Universe</h2>
            <p className={styles.sectionBlurb}>
              Every application below is one I designed, built and shipped. They are
              not a list of clients — they are one ecosystem, sharing a data platform,
              an identity layer and a release train.
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
