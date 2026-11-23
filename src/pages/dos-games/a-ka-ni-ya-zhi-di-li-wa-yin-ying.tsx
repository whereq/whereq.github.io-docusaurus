import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/a-ka-ni-ya-zhi-di-li-wa-yin-ying';

/** 阿卡尼亚之地莉娃阴影 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
