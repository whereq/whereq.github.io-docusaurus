import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/ke-su-lu-chuan-shuo-mo-ying-ha-lei';

/** 克苏鲁传说魔影哈雷 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
