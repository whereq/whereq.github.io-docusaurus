import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/gui-wu-mo-ying-wan-sheng-jie-te-bie-pian';

/** 鬼屋魔影万圣节特别篇 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
