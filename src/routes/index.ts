import { Application } from 'express';
import users from './users';
import games from './games';

export default (app: Application) => {
  users(app);
  games(app);
};
