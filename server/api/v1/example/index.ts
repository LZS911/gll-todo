import Router = require('koa-router');
import { API_V } from '../../../data/constant';
import { ExampleControllers } from './controllers';

const router = new Router({
  prefix: `/api/${API_V}/example`,
});

/**
 * @swagger
 * /api/v1/example/getExample:
 *   get:
 *     description: example
 *     tags: [example]
 *     operationId: getExampleList
 *     parameters:
 *       - in: "query"
 *         name: "id"
 *         description: "primary"
 *         type: "number"
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 获取成功
 *         schema:
 *          $ref: '#/definitions/ExampleItem'
 */
router.get('/getExample', ExampleControllers.listExample);

/**
 * @swagger
 * /api/v1/example/addExample:
 *   post:
 *     description: example
 *     tags: [example]
 *     operationId: addExample
 *     parameters:
 *       - in: "body"
 *         name: "name"
 *         description: "example to name"
 *         type: "string"
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 是否添加成功
 *         schema:
 *          $ref: '#/definitions/ReturnMessage'
 */
router.post('/addExample', ExampleControllers.addExample);

/**
 * @swagger
 * /api/v1/example/removeExample:
 *   post:
 *     description: example
 *     tags: [example]
 *     operationId: removeExample
 *     parameters:
 *       - in: "body"
 *         name: "id"
 *         description: "primary"
 *         type: "number"
 *         required: true
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 是否删除成功
 *         schema:
 *          $ref: '#/definitions/ReturnMessage'
 */
router.post('/removeExample', ExampleControllers.removeExample);

export default router;
