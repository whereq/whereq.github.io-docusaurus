import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/pce-he-ji-zhi-xing-pce-wen-jian-ming';

/** PCE合集(执行PCE+文件名) — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
