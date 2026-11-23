import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/yi-zhao-lv-xing-zhe-2';

/** 亿兆旅行者2 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
