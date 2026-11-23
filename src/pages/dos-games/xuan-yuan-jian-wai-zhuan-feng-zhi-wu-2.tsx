import React from 'react';
import DosGamePage from '../../components/DosGames/DosGamePage';
import entry from '../../data/dos-games/xuan-yuan-jian-wai-zhuan-feng-zhi-wu-2';

/** 轩辕剑外传：枫之舞 — the DOS games catalogue. */
export default function DosGame(): React.JSX.Element {
  return <DosGamePage entry={entry} />;
}
