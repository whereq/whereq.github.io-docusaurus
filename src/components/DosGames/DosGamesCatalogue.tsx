import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {DOS_GAMES_INDEX, DosGameIndexEntry} from '../../data/dos-games-index';
import GiscusComments from '../GiscusComments';
import styles from './dos-games.module.css';

/**
 * The catalogue of every DOS game in the archive.
 *
 * It sits outside the Atlas on purpose. The Atlas rail lists every page of
 * a collection, so a collection of 1 898 games would put a 1 898-item
 * sidebar on every page — eight times the weight of a normal page, for the
 * whole site. Here the list is a table with a filter over it, and a game's
 * own page carries no sidebar at all.
 */
export default function DosGamesCatalogue(): React.JSX.Element {
  const [query, setQuery] = React.useState('');
  const [letter, setLetter] = React.useState('');

  const letters = React.useMemo(() => {
    const counts = new Map<string, number>();
    for (const game of DOS_GAMES_INDEX) {
      counts.set(game.tag, (counts.get(game.tag) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, []);

  const games = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    return DOS_GAMES_INDEX.filter((game) => {
      if (letter && game.tag !== letter) {
        return false;
      }
      if (!needle) {
        return true;
      }
      return (
        game.name.toLowerCase().includes(needle) ||
        game.id.toLowerCase().includes(needle) ||
        game.entry.toLowerCase().includes(needle)
      );
    });
  }, [query, letter]);

  const totalBytes = DOS_GAMES_INDEX.reduce((sum, game) => sum + game.size, 0);

  return (
    <Layout
      title="DOS Games — the WhereQ archive"
      description={`Every one of the ${DOS_GAMES_INDEX.length} DOS games in the WhereQ archive: the facts read out of the bundle itself, the download, and the setup each one needs in WhereQ-DOSBox.`}>
      <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>The DOS game archive</p>
        <h1 className={styles.title}>Every DOS game in the archive</h1>
        <p className={styles.lead}>
          The archive behind the WhereQ Atlas holds {DOS_GAMES_INDEX.length} DOS
          games. Every one of them has a page here: the facts read out of the
          bundle itself, the download, and the setup its shape implies. The
          games that have been played through on an emulator carry the whole
          route in — which file to start, which key opens the menu, what comes
          next — and they sit on the{' '}
          <Link to="/atlas/dos-games/">Atlas shelf</Link> with a drawn card
          mark.
        </p>

        <dl className={styles.stats}>
          <div className={styles.stat}>
            <dt>Games</dt>
            <dd>{DOS_GAMES_INDEX.length}</dd>
          </div>
          <div className={styles.stat}>
            <dt>Archive</dt>
            <dd>
              {(totalBytes / 1e9).toFixed(1)}
              <span className={styles.statMeta}>GB</span>
            </dd>
          </div>
          <div className={styles.stat}>
            <dt>Showing</dt>
            <dd>{games.length}</dd>
          </div>
        </dl>
      </header>

      <div className={styles.controls}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search by name, pinyin or entry point…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className={styles.letters}>
          <button
            className={`${styles.letter} ${letter === '' ? styles.letterOn : ''}`}
            type="button"
            onClick={() => setLetter('')}>
            All
          </button>
          {letters.map(([tag, count]) => (
            <button
              className={`${styles.letter} ${letter === tag ? styles.letterOn : ''}`}
              key={tag}
              type="button"
              onClick={() => setLetter(tag)}>
              {tag.toUpperCase()}
              <span className={styles.letterCount}>{count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Game</th>
              <th>Year</th>
              <th>Entry point</th>
              <th>Files</th>
              <th>Size</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <Row game={game} key={game.id} />
            ))}
          </tbody>
        </table>
      </div>

      {games.length === 0 && (
        <p className={styles.empty}>Nothing matches that. Try a shorter word.</p>
      )}

      <aside className={styles.notice}>
        <p className={styles.noticeTitle}>About these downloads</p>
        <p className={styles.noticeText}>
          The archives linked from this catalogue are published for study,
          communication and preservation only. They are the work of their
          authors and publishers, who hold the rights in them; publishing one
          here claims none of those rights and waives none of them. If you
          believe a download here breaks a licence, a copyright or any other
          right, tell us and we will take it down.
        </p>
      </aside>

      <section className={styles.comments}>
        <h2 className={styles.sectionTitle}>Comments</h2>
        <p className={styles.para}>
          A download that 404s, a name that is wrong, a game that starts and
          then falls over — say so here. The comments on a game's own page are
          where the route in belongs.
        </p>
        <GiscusComments />
      </section>
      </main>
    </Layout>
  );
}

/** One line of the catalogue. */
function Row({game}: {game: DosGameIndexEntry}) {
  return (
    <tr>
      <td>
        <Link className={styles.name} to={game.page}>
          {game.name}
        </Link>
      </td>
      <td className={styles.year}>{game.year || '—'}</td>
      <td>
        <code className={styles.entry}>{game.entry}</code>
      </td>
      <td className={styles.number}>{game.files}</td>
      <td className={styles.number}>{formatSize(game.size)}</td>
      <td>
        <a className={styles.download} href={game.url}>
          Download
        </a>
      </td>
    </tr>
  );
}

/** A file size, the way a person reads it. */
function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }
  return `${Math.round(bytes / 1024)} KB`;
}
