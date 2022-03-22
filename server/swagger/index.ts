/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import path = require('path');
import { SwaggerDefinition } from 'swagger-jsdoc';
import swaggerJSDoc = require('swagger-jsdoc');
import { API_V, HOST, PORT } from '../data/constant';
import routerNames = require('../utils/readAllRouter');

let definitions = {};
routerNames.default.forEach((v) => {
  const def = require(`../api/${API_V}/${v}/definitions.ts`).default;
  definitions = { ...definitions, ...def };
});

const swaggerDefinition: SwaggerDefinition = {
  info: {
    title: 'API',
    version: '1.0.0',
    description: 'API',
  },
  host: `http://${HOST}:${PORT}`,
  basePath: '/',
  definitions,
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, `../api/${API_V}/**/*.ts`)],
};

const jsonSpc = swaggerJSDoc(options);

export default jsonSpc;
