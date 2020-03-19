import joi from 'joi';
import { Application, RequestHandler } from 'express';
import { UserModel } from '../../models/User';
import validator from '../../server/middlewares/validator';

const validateSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const create: RequestHandler = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await UserModel.createUser({ email, password });
    return response.status(200).send({
      token: user.getAuthenticationToken(),
    });
  } catch (e) {
    return response.status(400).send(e);
  }
};

const usersCreate = (app: Application) => app.post('/users', validator(validateSchema), create);

export default usersCreate;
