import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/ya-ma-xun-yi-dian-yuan-shou-wei-zhe';

/** 亚马逊伊甸园守卫者 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
