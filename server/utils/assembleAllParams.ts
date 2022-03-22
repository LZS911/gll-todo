import { Context } from 'koa';
import { BOOLEAN_MAP } from '../data/constant';

const translateBooleanParam = (param: { [key in string]: any }) => {
  Object.keys(param).forEach((key) => {
    if (param[key] === 'true' || param[key] === 'false') {
      param[key] = BOOLEAN_MAP.get(param[key]);
    }
  });
  return param;
};

export default function assembleAllParams<
  T1 extends { [key in string]: any },
  T2 extends { [key in string]: any }
>(
  ctx: Context
): {
  body: T1;
  query: T2;
  path: string;
  header: any;
} {
  return {
    body: translateBooleanParam(ctx.request.body) as T1,
    query: translateBooleanParam(ctx.request.query) as T2,
    path: ctx.params,
    header: ctx.request.header,
  };
}
