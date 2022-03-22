import Router = require('koa-router');
import { API_V } from '../../../data/constant';
import { UserControllers } from './controllers';

const router = new Router({
  prefix: `/api/${API_V}/user`,
});

router.post('/login', UserControllers.userLogin);

export default router;
