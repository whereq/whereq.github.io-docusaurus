import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/wu-jin-de-hei-an-2';

/** 无尽的黑暗2 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
