import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/fu-er-mo-si-2-mei-gui-wen-shen';

/** 福尔摩斯2玫瑰纹身 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
