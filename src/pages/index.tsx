import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
  link: string;
};

const features: FeatureItem[] = [
  {
    title: 'Cloud & Kubernetes',
    icon: '☁️',
    description: 'Deep dives into Kubernetes internals, distributed systems, and cloud-native architecture.',
    link: '/blog/tags/kubernetes',
  },
  {
    title: 'Java & Spring',
    icon: '☕',
    description: 'Spring Boot, WebFlux, reactive programming, microservices patterns, and performance.',
    link: '/blog/tags/spring',
  },
  {
    title: 'AI & Machine Learning',
    icon: '🤖',
    description: 'LLMs, RAG systems, vector databases, ChatGPT-like architectures, and ML pipelines.',
    link: '/blog/tags/ai',
  },
  {
    title: 'React & Frontend',
    icon: '⚛️',
    description: 'Modern React patterns, TypeScript, state management, and web performance.',
    link: '/blog/tags/react',
  },
  {
    title: 'Python & Data',
    icon: '🐍',
    description: 'Python for engineers, data pipelines, Avro/Parquet, and cloud-native data patterns.',
    link: '/blog/tags/python',
  },
  {
    title: 'DevOps & Linux',
    icon: '🛠️',
    description: 'Docker, CI/CD, Linux command-line mastery, PostgreSQL, and system administration.',
    link: '/blog/tags/devops',
  },
];

function HeroBanner() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">WhereQ</h1>
        <p className="hero__subtitle">
          Key to Marvel — Engineering insights from the trenches of distributed systems,
          cloud infrastructure, and modern software development.
        </p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/blog">
            Read the Blog
          </Link>
          <Link className="button button--secondary button--lg" to="/about" style={{ marginLeft: '1rem' }}>
            About Me
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({ title, icon, description, link }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <Link to={link} className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDesc}>{description}</p>
      </Link>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HeroBanner />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((feature, idx) => (
                <FeatureCard key={idx} {...feature} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
