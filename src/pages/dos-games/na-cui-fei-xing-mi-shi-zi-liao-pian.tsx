import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/na-cui-fei-xing-mi-shi-zi-liao-pian';

/** 纳粹飞行秘史+资料片 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
