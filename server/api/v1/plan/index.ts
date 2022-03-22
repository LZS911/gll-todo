import Router = require('koa-router');
import { API_V } from '../../../data/constant';
import { PlanControllers } from './controllers';

const router = new Router({
  prefix: `/api/${API_V}/plan`,
});

router.post('/addPlan', PlanControllers.addPlan);
router.post('/changePlan', PlanControllers.changePlan);
router.get('/getPlan', PlanControllers.getPlan);
router.get('/setStatus', PlanControllers.setStatus);

export default router;
