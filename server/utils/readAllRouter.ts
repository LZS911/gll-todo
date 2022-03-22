import fs = require('fs-extra');
import path = require('path');
import { API_V } from '../data/constant';

const routerPath = path.join(__dirname, `../api/${API_V}`);
const routerNames: string[] = fs
  .readdirSync(routerPath, { withFileTypes: true })
  .filter((dirent) => !dirent.name.startsWith('.'))
  .map((dirent) => dirent.name);

export default routerNames;
