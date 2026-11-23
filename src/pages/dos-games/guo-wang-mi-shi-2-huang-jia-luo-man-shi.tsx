import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/guo-wang-mi-shi-2-huang-jia-luo-man-shi';

/** 国王密使2皇家罗曼史 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
