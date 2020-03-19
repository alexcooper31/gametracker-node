import { Application, RequestHandler } from 'express';
import _ from 'lodash';

import IGDB from '../../services/IGDB';
import { requireAuthenticated } from '../../server/middlewares/auth';

const upcoming: RequestHandler = async (__, response) => {
  try {
    const responseArray: any[] = [];

    const result = await IGDB.upcoming();

    for (const e of result) {
      const games = await IGDB.game(e.game);
      const cover = await IGDB.cover(e.game);
      games[0].game = e.game;
      games[0].url =
        cover && cover.length > 0
          ? `https:${cover.pop().url}`.replace('thumb', 'cover_big')
          : 'https://pbs.twimg.com/profile_images/759121918159093760/OuFOt8p4_400x400.jpg';
      responseArray.push(games[0]);
    }

    return response.send(
      _.uniqBy(responseArray, 'game').slice(0, 5),
    );
  } catch (err) {
    return response.status(400).send(err);
  }
};

const upcomingGames = (app: Application) => app.get('/games/upcoming', requireAuthenticated, upcoming);

export default upcomingGames;
