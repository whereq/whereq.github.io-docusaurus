import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/mi-lan-si-ji-shi-sheng-yu-chuan-qi';

/** 米兰斯纪事-圣域传奇 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
