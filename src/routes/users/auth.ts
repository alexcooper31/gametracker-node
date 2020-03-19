import joi from 'joi';
import { Application, RequestHandler } from 'express';
import { UserModel } from '../../models/User';
import validator from '../../server/middlewares/validator';

const validateSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const auth: RequestHandler = async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await UserModel.login({ email, password });
    return response.status(200).send({
      token,
    });
  } catch (e) {
    return response.status(400).send(e);
  }
};

const usersAuth = (app: Application) => app.post('/auth', validator(validateSchema), auth);

export default usersAuth;
