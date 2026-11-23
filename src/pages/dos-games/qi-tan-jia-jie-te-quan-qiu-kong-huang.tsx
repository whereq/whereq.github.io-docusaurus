import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/qi-tan-jia-jie-te-quan-qiu-kong-huang';

/** 奇探加杰特全球恐慌 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
