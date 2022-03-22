/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import cors = require('koa2-cors');
import parser = require('koa-bodyparser');
import Router = require('koa-router');
import session = require('koa-session');
import Koa = require('koa');
import koaSwagger = require('koa2-swagger-ui');
import routerNames from '../utils/readAllRouter';
import { API_V } from '../data/constant';
import { accessLogger } from '../logger/index';

const router = new Router();

export const initRouters = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  app.use(parser());
  app.use(router.allowedMethods());
  routerNames.forEach((name) => {
    app.use(require(`../api/${API_V}/${name}/index`).default.routes());
  });
};

export const initCors = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  app.use(
    cors({
      credentials: true,
      origin(ctx) {
        return ctx.header.origin ?? '';
      },
      allowMethods: ['GET', 'POST'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
    })
  );
};

export const initSession = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  app.keys = ['some secret hurr'];
  const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false,
  };
  app.use(session(CONFIG, app));
};

export const initSwaggerUI = (
  app: Koa<Koa.DefaultState, Koa.DefaultContext>
) => {
  app.use(
    koaSwagger.koaSwagger({
      routePrefix: '/swagger',
      swaggerOptions: {
        url: '/swagger.json',
      },
    })
  );
};

// export const formatErrorInfo = (
//   app: Koa<Koa.DefaultState, Koa.DefaultContext>
// ) => {
//   app.use(async (ctx, next) => {
//     try {
//       await next();
//     } catch (error) {
//       ctx.body = help.fail(getErrorMessage(error as any));
//       logger.error(error);
//     }
//   });
// };

export const initLogger = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  app.use(accessLogger());
};
