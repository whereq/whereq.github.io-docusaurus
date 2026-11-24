import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {Scrollbar, scrollbarCss} from '@whereq/react';
import {DOS_GAMES_INDEX, DosGameIndexEntry} from '../../data/dos-games-index';
import {
  DOS_GAME_CATEGORIES,
  DOS_GAME_CATEGORY_BY_ID,
  DosGameCategory,
} from '../../data/dos-games-categories';
import GiscusComments from '../GiscusComments';
import styles from './dos-games.module.css';

/**
 * The catalogue of every DOS game in the archive.
 *
 * It sits outside the Atlas on purpose. The Atlas rail lists every page of
 * a collection, so a collection of 1 898 games would put a 1 898-item
 * sidebar on every page — eight times the weight of a normal page, for the
 * whole site. Here the list is a panel of cards over a search box, and a
 * game's own page carries no sidebar at all.
 *
 * The games are sorted into categories, and a game can be in more than one
 * of them: the archive files it under one, and the description the same
 * project publishes may name another as well. A game that is in two
 * categories is shown under both.
 *
 * The listing is a panel of its own, with the scrollbar from
 * `@whereq/react`. The search box and the category filters sit at the top
 * of it and stay there while it scrolls, so a reader always knows which
 * filters are applied to what is on screen.
 */
export default function DosGamesCatalogue(): React.JSX.Element {
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState<string[]>([]);

  /** The games that match the search box, whatever the categories are. */
  const searched = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return DOS_GAMES_INDEX;
    }
    return DOS_GAMES_INDEX.filter(
      (game) =>
        game.name.toLowerCase().includes(needle) ||
        game.id.toLowerCase().includes(needle) ||
        game.entry.toLowerCase().includes(needle),
    );
  }, [query]);

  /** The games left after the categories are applied. */
  const visible = React.useMemo(() => {
    if (active.length === 0) {
      return searched;
    }
    return searched.filter((game) => game.types.some((type) => active.includes(type)));
  }, [searched, active]);

  /**
   * The groups on screen: one per category that still has games in it.
   *
   * A game in two categories is in two groups, which is the point — the
   * counts below add up to more than the number of games.
   */
  const groups = React.useMemo(() => {
    return DOS_GAME_CATEGORIES.map((category) => ({
      category,
      games: visible.filter((game) => game.types.includes(category.id)),
    })).filter((group) => group.games.length > 0);
  }, [visible]);

  /** How many games each category holds under the current search. */
  const counts = React.useMemo(() => {
    const tally = new Map<string, number>();
    for (const game of searched) {
      for (const type of game.types) {
        tally.set(type, (tally.get(type) ?? 0) + 1);
      }
    }
    return tally;
  }, [searched]);

  const totalBytes = DOS_GAMES_INDEX.reduce((sum, game) => sum + game.size, 0);

  const toggle = (id: string) => {
    setActive((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const filtered = active.length > 0 || query.trim() !== '';

  return (
    <Layout
      title="DOS Games — the WhereQ archive"
      description={`Every one of the ${DOS_GAMES_INDEX.length} DOS games in the WhereQ archive: the facts read out of the bundle itself, the download, and the setup each one needs in WhereQ-DOSBox.`}>
      {/*
       * The `@whereq/react` scrollbar stylesheet, rendered here so it is in
       * the server HTML — no flash of the browser's default scrollbar before
       * hydration. The id is the library's own, so the component finds this
       * tag and does not inject a second copy.
       */}
      <style id="wq-scrollbar-styles">{scrollbarCss}</style>
      <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>The DOS game archive</p>
        <h1 className={styles.title}>Every DOS game in the archive</h1>
        <p className={styles.lead}>
          The archive behind the WhereQ Atlas holds {DOS_GAMES_INDEX.length} DOS
          games. Every one of them has a page here: the facts read out of the
          bundle itself, the download, and the setup its shape implies. The
          games are sorted into categories below — a game can be in more than
          one, and the ones that have been played through on an emulator sit
          on the <Link to="/atlas/dos-games/">Atlas shelf</Link> with a drawn
          card mark.
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
            <dt>Categories</dt>
            <dd>{DOS_GAME_CATEGORIES.length}</dd>
          </div>
        </dl>
      </header>

      <section className={styles.catalogue}>
        {/*
          * The filters. They sit above the listing and stick to the top of
          * the viewport, so a reader always knows which filters are applied
          * to what is on screen — whether they are scrolling the page or the
          * list inside it.
        */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarTop}>
            <input
              className={styles.search}
              type="search"
              placeholder="Search by name, pinyin or entry point…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search the games"
            />
            <p className={styles.tally} aria-live="polite">
              <strong>{visible.length}</strong>
              <span className={styles.tallyMeta}>
                {visible.length === 1 ? 'game' : 'games'}
                {active.length > 0 &&
                  ` in ${active.length} categor${active.length === 1 ? 'y' : 'ies'}`}
              </span>
            </p>
          </div>

          <div className={styles.chips} role="group" aria-label="Filter by category">
            <button
              className={`${styles.chip} ${active.length === 0 ? styles.chipOn : ''}`}
              type="button"
              onClick={() => setActive([])}
              aria-pressed={active.length === 0}>
              All
              <span className={styles.chipCount}>{searched.length}</span>
            </button>
            {DOS_GAME_CATEGORIES.map((category) => {
              const count = counts.get(category.id) ?? 0;
              const on = active.includes(category.id);
              return (
                <button
                  className={`${styles.chip} ${on ? styles.chipOn : ''}`}
                  type="button"
                  key={category.id}
                  onClick={() => toggle(category.id)}
                  aria-pressed={on}
                  disabled={count === 0 && !on}>
                  <span
                    className={styles.chipDot}
                    style={{background: category.accent}}
                    aria-hidden="true"
                  />
                  {category.label}
                  <span className={styles.chipCount}>{count}</span>
                </button>
              );
            })}
            {filtered && (
              <button
                className={styles.clear}
                type="button"
                onClick={() => {
                  setQuery('');
                  setActive([]);
                }}>
                Clear
              </button>
            )}
          </div>
        </div>

        {/*
         * The listing panel. Its own scrollbar comes from `@whereq/react`,
         * the same one the Atlas rail uses.
         */}
        <Scrollbar className={styles.listing} axis="vertical">
          <div className={styles.listingInner}>
            {groups.map((group) => (
              <Group key={group.category.id} category={group.category} games={group.games} />
            ))}

            {groups.length === 0 && (
              <p className={styles.empty}>
                Nothing matches that. Try a shorter word, or clear the categories.
              </p>
            )}
          </div>
        </Scrollbar>
      </section>

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

/** One category and the games in it. */
function Group({
  category,
  games,
}: {
  category: DosGameCategory;
  games: DosGameIndexEntry[];
}) {
  return (
    <section className={styles.group} aria-labelledby={`group-${category.id}`}>
      <div className={styles.groupHead}>
        <span
          className={styles.groupRule}
          style={{background: category.accent}}
          aria-hidden="true"
        />
        <div className={styles.groupHeadMain}>
          <h2 className={styles.groupTitle} id={`group-${category.id}`}>
            {category.label}
            <span className={styles.groupCount}>{games.length}</span>
          </h2>
          <p className={styles.groupBlurb}>{category.blurb}</p>
        </div>
      </div>
      <div className={styles.grid}>
        {games.map((game) => (
          <GameCard game={game} key={game.id} />
        ))}
      </div>
    </section>
  );
}

/**
 * One game.
 *
 * The card carries the facts read out of the bundle, the mark the archive
 * gave the game, and the two ways out of it: the page, and the download.
 */
function GameCard({game}: {game: DosGameIndexEntry}) {
  return (
    <article className={styles.card}>
      <Link className={styles.cardLink} to={game.page}>
        <span className={styles.cardMark}>
          <img
            src={`/img/dos-games/${game.id}.svg`}
            alt=""
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
          />
        </span>
        <span className={styles.cardHead}>
          <span className={styles.cardName}>{game.name}</span>
          <span className={styles.cardTypes}>
            {game.types.map((type, index) => (
              <span className={styles.cardType} key={type}>
                {index === 0
                  ? DOS_GAME_CATEGORY_BY_ID[type]?.label ?? type
                  : `+ ${DOS_GAME_CATEGORY_BY_ID[type]?.label ?? type}`}
              </span>
            ))}
          </span>
        </span>
      </Link>

      <dl className={styles.cardFacts}>
        <div className={styles.cardFact}>
          <dt>Year</dt>
          <dd>{game.year || '—'}</dd>
        </div>
        <div className={styles.cardFact}>
          <dt>Entry point</dt>
          <dd>
            <code className={styles.cardEntry}>{game.entry}</code>
          </dd>
        </div>
        <div className={styles.cardFact}>
          <dt>Files</dt>
          <dd>{game.files.toLocaleString('en-US')}</dd>
        </div>
        <div className={styles.cardFact}>
          <dt>Size</dt>
          <dd>{formatSize(game.size)}</dd>
        </div>
      </dl>

      <div className={styles.cardActions}>
        <Link className={styles.cardRead} to={game.page}>
          Read the page
        </Link>
        <a
          className={styles.cardDownload}
          href={game.url}
          target="_blank"
          rel="noopener noreferrer">
          Download
        </a>
      </div>
    </article>
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
