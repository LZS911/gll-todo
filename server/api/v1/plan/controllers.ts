/* eslint-disable @typescript-eslint/naming-convention */
import { Context } from 'koa';
import { getManager, In, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Plan } from '../../../entity/plan';
import { logger } from '../../../logger';
import assembleAllParams from '../../../utils/assembleAllParams';
import getErrorMessage from '../../../utils/getErrorMessage';
import help from '../../../utils/help';
import { judgeTime } from '../../../utils/time';
import { PlanTypeEnum } from './enum';
import { IChangePlanParam, IGetPlanParam, ISetStatus } from './index.type';

export class PlanControllers {
  public static async addPlan(ctx: Context) {
    try {
      const { body } = assembleAllParams<Plan, []>(ctx);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const planRepository = getManager().getRepository(Plan);

      if (judgeTime(new Date(), [body.start_time, body.end_time])) {
        body.plan_status = PlanTypeEnum.underway;
      } else if (judgeTime(body.end_time, [, new Date()])) {
        body.plan_status = PlanTypeEnum.failed;
      } else {
        body.plan_status = PlanTypeEnum.toDo;
      }
      await planRepository.insert(body);
      logger.info(`新增 plan 数据: ${JSON.stringify(body)}`);
      ctx.body = help.success();
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }

  public static async changePlan(ctx: Context) {
    try {
      const {
        body: { plan_id, plan_content, plan_title },
      } = assembleAllParams<IChangePlanParam, []>(ctx);
      if (!plan_id || !plan_content || !plan_title) {
        help.fail('参数错误!');
        return;
      }
      const planRepository = getManager().getRepository(Plan);

      const currentPlan = await planRepository.findOne(plan_id);
      if (!currentPlan) {
        ctx.body = help.fail('未找到改计划!');
        return;
      }

      await planRepository.save({ ...currentPlan, plan_content, plan_title });

      logger.info(
        `修改: 计划id为: ${plan_id}, 修改后的 title: ${plan_title}, content:${plan_content}`
      );

      ctx.body = help.success();
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }

  public static async getPlan(ctx: Context) {
    try {
      const {
        query: { plan_status, start_time, end_time },
      } = assembleAllParams<[], IGetPlanParam>(ctx);

      const planRepository = getManager().getRepository(Plan);

      if (!plan_status && !start_time && !end_time) {
        ctx.body = help.json(await planRepository.find());
        return;
      }

      const needCheckStatus = await planRepository.find({
        plan_status: In(['toDo', 'underway']),
      });

      needCheckStatus.forEach((item) => {
        if (
          judgeTime(new Date(), [item.start_time, item.end_time]) &&
          item.plan_status === 'toDo'
        ) {
          planRepository.save({ ...item, plan_status: 'underway' });
          logger.info(
            `自动修改 plan 数据状态为 进行中, title:${item.plan_title}, id: ${item.plan_id}`
          );
        } else if (
          judgeTime(item.end_time, [, new Date()]) &&
          item.plan_status === 'underway'
        ) {
          planRepository.save({ ...item, plan_status: 'failed' });
          logger.info(
            `自动修改 plan 数据状态为 失败, title:${item.plan_title}, id: ${item.plan_id}`
          );
        }
      });

      const query: any = {
        start_time: MoreThanOrEqual(start_time),
        end_time: LessThanOrEqual(end_time),
      };
      if (plan_status !== 'all') {
        query.plan_status = plan_status;
      }

      const data = await planRepository.find(query);
      logger.info(
        `查询 plan, status: ${plan_status}, start_time:${start_time}, end_time:${end_time}`
      );
      ctx.body = help.json(data);
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }

  public static async setStatus(ctx: Context) {
    try {
      const {
        query: { plan_id, plan_title, plan_status },
      } = assembleAllParams<[], ISetStatus>(ctx);

      if (!plan_id && !plan_status && !plan_title) {
        ctx.body = help.fail('参数错误!');
        return;
      }
      if (!['successful', 'delete', 'failed'].includes(plan_status)) {
        ctx.body = help.fail('无效的计划状态!');
        return;
      }

      const planRepository = getManager().getRepository(Plan);

      const currentPlan = await planRepository.findOne(plan_id);
      if (!currentPlan) {
        ctx.body = help.fail('未找到改计划!');
        return;
      }

      await planRepository.save({ ...currentPlan, plan_status });

      ctx.body = help.success();
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }
}
