import React, { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import { BsYinYang } from 'react-icons/bs';
import styles from './about.module.css';

const tocItems = [
  { id: 'intro',      label: 'Introduction' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
];

type Project = {
  name: string;
  description: string;
  url: string;
  logo?: string;          // image path
  icon?: React.ReactNode; // react-icons component
};

const projects: Project[] = [
  {
    logo: '/img/whereq-cc.png',
    name: 'WhereQ — LLM',
    description: 'AI/LLM integrated platform',
    url: 'https://www.whereq.cc',
  },
  {
    logo: '/img/whereq-com.png',
    name: 'WhereQ — Real Estate',
    description: 'Real Estate platform 3.x',
    url: 'https://www.whereq.com',
  },
  {
    // Backup image: '/img/logo.png' (amber yin-yang PNG)
    icon: <BsYinYang className={styles.projectIcon} />,
    name: 'Key To Marvel',
    description: 'Engineering blog & resources',
    url: 'https://www.keytomarvel.com',
  },
];

const experience = [
  {
    company: 'WhereQ Inc.',
    url: 'https://www.whereq.com',
    title: 'Owner',
    period: '2020 – Present',
    summary:
      'Founded WhereQ Inc., specializing in web 2.0 applications for the Real Estate Industry, offering OpenAI integration and practical AI applications.',
    achievements: [
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
      'Tech leader and solution architect designing solutions for the BNS data platform, focusing on big data streaming, metric collection, performance tuning, and automation.',
    achievements: [
      'Designed and implemented "Spark as a Service" and an Avro/JSON flattener service.',
      'Developed lightweight scaffolding using Spring Boot, R2DBC, and MapStruct to simplify API development.',
      'Led end-to-end solution design for data consumption using Presto, connecting HDFS, ElasticSearch, and PostgreSQL.',
      'Developed ElasticSearch metrics tools and centralized business calendar services using Node.js and PostgreSQL.',
      'Reengineered Credit 360 application, improving performance, codebase, and validation frameworks.',
    ],
    stack: 'Kubernetes, Docker, Presto, Spark, Kafka, HDFS, ElasticSearch, Power BI, Java, Spring Boot, Angular, MongoDB, Jenkins, PostgreSQL, Git',
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
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function About(): JSX.Element {
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

    tocItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <Layout title="About" description="About Dazhi Zhang (Tony) — Engineering Leader and Software Architect">
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
                <p className={styles.heroTitle}>Senior Software Developer &amp; Engineering Leader</p>
                <p className={styles.heroTagline}>Time can fade everything</p>
                <div className={styles.heroContact}>
                  <span>📞 (416) 835-8767</span>
                  <span>✉️ <a href="mailto:googol.zhang@gmail.com">googol.zhang@gmail.com</a></span>
                </div>
              </div>
            </div>
            <p className={styles.heroBio}>
              A well-qualified software developer, a fast learner, a highly motivated
              self-starter, and a reliable person to work with.
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
            <h2 className={styles.sectionTitle}>Projects</h2>
            <div className={styles.projects}>
              {projects.map((p) => (
                <a key={p.url} href={p.url} target="_blank" rel="noopener noreferrer" className={styles.projectCard}>
                  {p.icon
                    ? <span className={styles.projectIconWrapper}>{p.icon}</span>
                    : <img src={p.logo} alt={p.name} className={styles.projectLogo} />}
                  <div className={styles.projectInfo}>
                    <span className={styles.projectName}>{p.name}</span>
                    <span className={styles.projectDesc}>{p.description}</span>
                  </div>
                </a>
              ))}
            </div>
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
