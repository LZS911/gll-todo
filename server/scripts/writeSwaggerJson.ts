import fs = require('fs-extra');
import path = require('path');
import { API_V } from '../data/constant';
import jsonSpc = require('../swagger');

const swaggerJsonPath = path.join(
  __dirname,
  `../api/${API_V}/docs/swagger.json`
);

fs.writeJSONSync(swaggerJsonPath, jsonSpc, {
  spaces: 2,
});
