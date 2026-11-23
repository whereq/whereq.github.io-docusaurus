import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/bao-lei-fang-wei-zhan-ling-guo-zhan-yi';

/** 堡垒防卫战/领国战役 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
