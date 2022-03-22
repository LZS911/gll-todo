import Router = require('koa-router');
import { API_V } from '../../../data/constant';
import { NoteControllers } from './controllers';

const router = new Router({
  prefix: `/api/${API_V}/note`,
});
router.post('/addNote', NoteControllers.addNote);
router.post('/changeNote', NoteControllers.changeNote);
router.get('/getNote', NoteControllers.getNote);
router.get('/deleteNote', NoteControllers.deleteNote);

export default router;
