import React from 'react';
import DosGamesCatalogue from '../../components/DosGames/DosGamesCatalogue';

/**
 * The DOS games catalogue — every game in the archive, with a search box and
 * a letter filter over it.
 *
 * It lives outside the Atlas on purpose: the Atlas rail lists every page of a
 * collection, so 1 898 games would put a 1 898-item sidebar on every page of
 * the site. Here the list is a table, and a game's own page carries no
 * sidebar at all.
 */
export default function DosGamesIndex(): React.JSX.Element {
  return <DosGamesCatalogue />;
}
