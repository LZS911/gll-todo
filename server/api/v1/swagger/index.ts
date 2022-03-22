import { Context } from 'koa';
import Router = require('koa-router');
import jsonSpc = require('../../../swagger');

const router = new Router({});

router.get('/swagger.json', (ctx: Context) => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = jsonSpc.default;
});

export default router;
