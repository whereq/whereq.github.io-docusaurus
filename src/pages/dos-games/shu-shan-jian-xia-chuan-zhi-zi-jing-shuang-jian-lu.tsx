import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/shu-shan-jian-xia-chuan-zhi-zi-jing-shuang-jian-lu';

/** 蜀山剑侠传之紫菁双剑录 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
