import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/lei-tai-mei-shao-nv-3-tian-shi-shuai-jiao-3';

/** 擂台美少女3/天使摔角3 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
