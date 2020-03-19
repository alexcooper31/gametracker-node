import { Application, RequestHandler } from 'express';

import IGDB from '../../services/IGDB';
import { requireAuthenticated } from '../../server/middlewares/auth';

const search: RequestHandler = async (request, response) => {
  try {
    const { term } = request.query;

    const result = await IGDB.search(term);

    let count = 0;
    for (const e of result) {
      const cover = await IGDB.cover(e.id);
      result[count].url = `https:${cover.pop().url}`.replace('thumb', 'cover_big');
      count += 1;
    }

    return response.status(200).send(result);
  } catch (e) {
    return response.status(400).send(e);
  }
};

const gamesSearch = (app: Application) => app.get('/games/search', requireAuthenticated, search);

export default gamesSearch;
