import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/chuang-shi-ji-wai-zhuan-1-huang-wu-di-guo';

/** 创世纪外传1荒芜帝国 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
