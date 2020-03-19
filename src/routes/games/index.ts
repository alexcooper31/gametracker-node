import { Application } from 'express';

import latestGames from './latest';
import gamesSearch from './search';
import upcomingGames from './upcoming';

export default (app: Application) => {
  latestGames(app);
  gamesSearch(app);
  upcomingGames(app);
};
