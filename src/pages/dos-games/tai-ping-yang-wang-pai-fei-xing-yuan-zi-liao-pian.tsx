import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/tai-ping-yang-wang-pai-fei-xing-yuan-zi-liao-pian';

/** 太平洋王牌飞行员+资料片 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
