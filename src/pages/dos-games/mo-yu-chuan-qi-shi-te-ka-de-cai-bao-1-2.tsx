import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/mo-yu-chuan-qi-shi-te-ka-de-cai-bao-1-2';

/** 魔域传奇:史特卡的财宝1.2 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
