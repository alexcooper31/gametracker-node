import { Request, RequestHandler } from 'express';
import * as jwt from 'jsonwebtoken';

import Environment from '../../environment';
import { IUserJWT, IUserPayload } from '../../models/User.interfaces';

interface IAuthenticatedRequest extends Request {
  user?: IUserPayload;
}

const validateToken = async (authToken?: string) => {
  let token: string = '';

  if (authToken) {
    const splittedToken = authToken.split(' ');
    if (splittedToken[0] === 'Bearer') {
      token = splittedToken[1];
    }
  }

  if (token && token !== '' && token !== ' ') {
    try {
      const { user } = (jwt.verify(token, Environment.variable('JWT_SECRET')) as IUserJWT);
      return user;
    } catch (e) {
      throw e;
    }
  }

  return;
};

const authMiddleware: RequestHandler = async (request: IAuthenticatedRequest, response, next) => {
  try {
    request.user = await validateToken(request.headers.authorization);
  } catch (e) {
    return response.sendStatus(401);
  }
  return next();
};

const requireAuthenticated: RequestHandler = (request: IAuthenticatedRequest, response, next) => {
  if (!request.user) {
    return response.sendStatus(401);
  }

  return next();
};

export default authMiddleware;

export {
  IAuthenticatedRequest,
  validateToken,
  requireAuthenticated,
};
