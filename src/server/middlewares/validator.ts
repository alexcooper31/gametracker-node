import joi, { ObjectSchema } from 'joi';
import { RequestHandler } from 'express';

const validator = (schema: ObjectSchema): RequestHandler =>
  (request, response, next) => {
    const { error } = joi.validate(request.body, schema);

    if (error === null) {
      return next();
    }

    return response.status(400).send(error);
  };

export default validator;
