import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/xian-jing-chuan-qi-2-wang-zhe-zhi-ting';

/** 仙境传奇2亡者之庁 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
