import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/xing-lin-ye-feng-kuang-zhu-ti-yi-yuan-tai-ban';

/** 杏林也疯狂(主题医院台版) — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
