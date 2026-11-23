import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/mo-yu-chuan-qi-shi-zhi-yu-yan-zhe-1-1';

/** 魔域传奇:石之预言者1.1 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
