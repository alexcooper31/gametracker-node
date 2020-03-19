import cors from 'cors';

import Environment from '../../environment';

const corsOptions = {
  credentials: true,
  origin: [Environment.variable('MAIN_DOMAIN')],
};

const corsMiddleware = cors(corsOptions);

export default corsMiddleware;
