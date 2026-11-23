import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/ren-jian-dao-shao-nian-yan-chi-xia';

/** 人间道少年燕赤霞 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
