import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/yan-long-qi-shi-tuan-ii-huang-jin-cheng-zhi-mi';

/** 炎龙骑士团II‧黄金城之谜 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
