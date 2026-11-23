import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/shang-gu-shen-bing';

/** 上古神兵 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
