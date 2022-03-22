import Koa = require('koa');
import { logger } from './logger';
import { createConnection } from 'typeorm';
import { HOST, PORT } from './data/constant';
import {
  initRouters,
  initSession,
  initCors,
  initSwaggerUI,
  initLogger,
} from './init';
import 'reflect-metadata';

createConnection()
  .then(() => {
    const app = new Koa();
    initLogger(app);
    initCors(app);
    initSession(app);
    initRouters(app);
    initSwaggerUI(app);

    app.listen(PORT, HOST, () =>
      logger.info(`API server listening on ${HOST}:${PORT}`)
    );
  })
  .catch((err: string) => {
    logger.error('TypeORM connection error:', err);
  });
