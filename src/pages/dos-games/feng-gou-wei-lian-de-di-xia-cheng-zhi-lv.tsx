import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/feng-gou-wei-lian-de-di-xia-cheng-zhi-lv';

/** 疯狗威廉的地下城之旅 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
