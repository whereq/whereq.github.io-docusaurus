import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/huang-fei-hong-tie-gong-ji-dou-wu-gong';

/** 黄飞鸿铁公鸡斗蜈蚣 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
