import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/qi-ying-xiong-wai-zhuan-wang-zhe-zhi-shi';

/** 七英雄外传王者之师 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
