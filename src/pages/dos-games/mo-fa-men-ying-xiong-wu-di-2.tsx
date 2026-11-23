import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/mo-fa-men-ying-xiong-wu-di-2';

/** 魔法门英雄无敌2 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
