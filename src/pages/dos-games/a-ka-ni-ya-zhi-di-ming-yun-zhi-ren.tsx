import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/a-ka-ni-ya-zhi-di-ming-yun-zhi-ren';

/** 阿卡尼亚之地命运之刃 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
