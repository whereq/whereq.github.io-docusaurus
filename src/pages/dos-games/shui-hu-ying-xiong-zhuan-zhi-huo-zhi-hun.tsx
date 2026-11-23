import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/shui-hu-ying-xiong-zhuan-zhi-huo-zhi-hun';

/** 水浒英雄传之火之魂 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
