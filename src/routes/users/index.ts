import { Application } from 'express';

import usersAuth from './auth';
import usersCreate from './create';

export default (app: Application) => {
  usersAuth(app);
  usersCreate(app);
};
