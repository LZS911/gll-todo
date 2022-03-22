import Router = require('koa-router');
import { API_V } from '../../../data/constant';
import { KnowledgeControllers } from './controllers';

const router = new Router({
  prefix: `/api/${API_V}/knowledge`,
});
router.post('/addKnowledge', KnowledgeControllers.addKnowledge);
router.post('/changeKnowledge', KnowledgeControllers.changeKnowledge);
router.get('/getKnowledge', KnowledgeControllers.getKnowledge);
router.get('/deleteKnowLedge', KnowledgeControllers.deleteKnowLedge);

export default router;
