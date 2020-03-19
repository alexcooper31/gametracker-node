import { Application } from 'express';

import usersAuth from './auth';
import usersCreate from './create';
import usersGetMe from './getMe';

export default (app: Application) => {
  usersAuth(app);
  usersCreate(app);
  usersGetMe(app);
};
