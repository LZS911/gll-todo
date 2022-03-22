import Router = require('koa-router');
import { API_V } from '../../../data/constant';
import { ManageControllers } from './controllers';

const router = new Router({
  prefix: `/api/${API_V}/manage`,
});

router.get('/getManageData', ManageControllers.getManageData);

export default router;
