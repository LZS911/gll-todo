import { IAddPlan } from '../../../api/plan/index.d';
import { PlanTypeEnum } from '../../../api/plan/enum';

export const planList: IAddPlan[] = [
  {
    title: ' 程序员的测试课',
    content: '[课程: 程序员的测试课](https://time.geekbang.org/column/article/404301)',
    start_time: '2021-09-01 10:01:17',
    end_time: '2021-09-30 23:59:59',
    level: 'importance',
    plan_status: PlanTypeEnum.underway,
    key: '1234123456789123456789abcde1234567812311234123456789ab-12345123456789ab012345678-41234567123456789a-',
  },
  {
    title: '9-10',
    content:
      '[ 每日一道面试题](http://localhost:9984/knowledge?title=什么是同源策略?)\n\n1. 工作: ~~暂无~~\n- ~~[DMP-9189](http://10.186.18.11/jira/browse/DMP-9189?filter=-1)~~。~~(提交复审)~~。 (完成复审)\n- ~~[DMP-9190](http://10.186.18.11/jira/browse/DMP-9190?filter=-1)~~。~~(提交复审)~~。 (完成复审)\n\n2.~~ 完成 `todo card` 公共组件的单元测试.~~\n\n3. ~~完成`utils`的单元测试~~',
    start_time: '2021-09-10 10:02:29',
    end_time: '2021-09-10 23:59:59',
    level: 'exigency',
    plan_status: PlanTypeEnum.successful,
    key: '12345678123456789abcde123456789abcd123456789abc123456789abcde0-12345123456789abcd1123456789abcd-4123',
  },
  {
    title: '9-13',
    content:
      '  每日一道面试题\n\n1. 工作: ~~暂无~~\n~~- [DMP-8864](http://10.186.18.11/jira/browse/DMP-8864)~~ (提交复审)\n2.  完成 todo 的 plan 页面单元测试\n3. 修复cookie失效后前端未返回到登陆页面问题\n',
    end_time: '2021-09-13 23:59:59',
    key: '1234567123456789abcd123412345123123456789abcde-123451123456789ab-412123456789123456-1234567812123412',
    level: 'exigency',
    plan_status: PlanTypeEnum.failed,
    start_time: '2021-09-13 10:18:14',
  },
];
