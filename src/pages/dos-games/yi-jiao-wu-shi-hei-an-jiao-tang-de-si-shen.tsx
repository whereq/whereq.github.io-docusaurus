import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/yi-jiao-wu-shi-hei-an-jiao-tang-de-si-shen';

/** 异教巫师黑暗教堂的死神 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
