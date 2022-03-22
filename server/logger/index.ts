import { isDev } from '../utils/tool';
import log4js = require('koa-log4');
import path = require('path');
import dotenv = require('dotenv');

dotenv.config();

const RUNTIME_PATH = path.resolve(__dirname, '../');
const LOG_PATH = path.join(RUNTIME_PATH, 'logs');

log4js.configure({
  appenders: {
    access: {
      type: isDev() ? 'console' : 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join(LOG_PATH, 'access.log'),
    },
    application: {
      type: isDev() ? 'console' : 'dateFile',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      filename: path.join(LOG_PATH, 'application.log'),
    },
    out: {
      type: 'console',
    },
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    application: { appenders: ['application'], level: 'all' },
  },
});

export const accessLogger = () => log4js.koaLogger(log4js.getLogger('access'));
export const logger = log4js.getLogger('application');
