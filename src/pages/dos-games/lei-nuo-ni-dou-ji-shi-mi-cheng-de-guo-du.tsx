import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/lei-nuo-ni-dou-ji-shi-mi-cheng-de-guo-du';

/** 雷诺尼都纪事(迷城的国度) — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
