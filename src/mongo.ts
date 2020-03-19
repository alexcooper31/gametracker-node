import mongoose from 'mongoose';

import { setGlobalOptions, Severity } from '@typegoose/typegoose';
import Environment from './environment';
import Logger from './helpers/Logger';

setGlobalOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
});

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      Environment.variable('MONGO_URI'),
      {
        useNewUrlParser: true,
        promiseLibrary: Promise,
        useCreateIndex: true,
        useUnifiedTopology: true,
      },
    );

    return mongoose.connection;
  } catch (e) {
    Logger.error(e);
    throw e;
  }
};

export default mongoConnect;
