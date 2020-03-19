import Logger from './helpers/Logger';
import mongoConnect from './mongo';
import server from './server';
import Environment from './environment';
import routes from './routes';

(async () => {
  Logger.info('Game Tracker simple backend.');
  Logger.info('============================');

  Logger.info('Connecting to MongoDB...');
  await mongoConnect();
  Logger.info('Successfully connected to MongoDB.');

  Logger.info('Starting express server...');
  const app = server();

  Logger.info('Initiating routes...');
  routes(app);

  const port = Environment.variable('PORT');
  app.listen(port, () => {
    Logger.info(`Server running at port ${port}.`);
    Logger.info('Health check at /status.');
    Logger.info('Welcome to Game Tracker.');
  });
})();
