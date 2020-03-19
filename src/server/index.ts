import * as bodyParser from 'body-parser';
import express from 'express';

import auth from './middlewares/auth';
import cors from './middlewares/cors';

export default () => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use(cors);
  server.use(auth);

  // Health check wildcard route
  server.get('/status', (_: express.Request, response: express.Response) => response.sendStatus(200));

  return server;
};
