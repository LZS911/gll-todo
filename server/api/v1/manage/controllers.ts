/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Knowledge } from '../../../entity/knowledge';
import { Note } from '../../../entity/note';
import { Plan } from '../../../entity/plan';
import { logger } from '../../../logger';
import assembleAllParams from '../../../utils/assembleAllParams';
import getErrorMessage from '../../../utils/getErrorMessage';
import help from '../../../utils/help';
import { calcRate } from '../../../utils/rate';
import {
  getStrDateWeek,
  judgeWhetherIsTargetMonth,
  judgeWhetherIsTargetWeek,
} from '../../../utils/time';
import { PlanTypeEnum } from '../plan/enum';
import {
  IGetManageCardReturn,
  IGetManageRateReturn,
  IGetManagerParam,
  IGetManageWeekReturn,
} from './index.type';

export class ManageControllers {
  public static async getManageData(ctx: Context) {
    try {
      const {
        query: { prev },
      } = assembleAllParams<[], IGetManagerParam>(ctx);

      const planRepository = getManager().getRepository(Plan);
      const NoteRepository = getManager().getRepository(Note);
      const knowledgeRepository = getManager().getRepository(Knowledge);

      let planList = await planRepository.find();
      let noteList = await NoteRepository.find();
      let knowledgeList = await knowledgeRepository.find();

      const card_number: IGetManageCardReturn = {
        note_count: noteList.length ?? 0,
        knowledge_count: knowledgeList.length ?? 0,
        plan_sum_count: planList.length ?? 0,
        plan_underway_count:
          planList.filter((item) => item.plan_status === PlanTypeEnum.underway)
            ?.length ?? 0,
        plan_successful_count:
          planList.filter(
            (item) => item.plan_status === PlanTypeEnum.successful
          )?.length ?? 0,
      };

      noteList = noteList.filter((item) =>
        judgeWhetherIsTargetWeek(prev, item.create_date.toString())
      );
      knowledgeList = knowledgeList.filter((item) =>
        judgeWhetherIsTargetWeek(prev, item.create_date.toString())
      );
      planList = planList.filter((item) =>
        judgeWhetherIsTargetMonth(prev, item.start_time)
      );
      const [complete_rate, underway_rate, failure_rate, todo_rate] = calcRate(
        planList.length ?? 0,
        planList.filter((item) => item.plan_status === PlanTypeEnum.successful)
          ?.length ?? 0,
        planList.filter((item) => item.plan_status === PlanTypeEnum.underway)
          ?.length ?? 0,
        planList.filter((item) => item.plan_status === PlanTypeEnum.failed)
          ?.length ?? 0,
        -1 // todo
      );

      const pie_rate: IGetManageRateReturn = {
        complete_rate,
        underway_rate,
        failure_rate,
        todo_rate,
      };

      const week_map = new Map<number, string>([
        [1, 'monday'],
        [2, 'tuesday'],
        [3, 'wednesday'],
        [4, 'thursday'],
        [5, 'friday'],
        [6, 'saturday'],
        [7, 'sunday'],
      ]);
      const note_week: IGetManageWeekReturn = {} as any;
      const knowledge_week: IGetManageWeekReturn = {} as any;
      noteList.forEach((note) => {
        const week = getStrDateWeek(note.create_date.toString());
        if (!!week && week > 0 && week < 8) {
          if (!note_week[week_map.get(week) as keyof IGetManageWeekReturn]) {
            note_week[week_map.get(week) as keyof IGetManageWeekReturn] = 0;
          }
          note_week[week_map.get(week) as keyof IGetManageWeekReturn] += 1;
        }
      });

      knowledgeList.forEach((knowledge) => {
        const week = getStrDateWeek(knowledge.create_date.toString());
        if (week && week > 0 && week < 8) {
          if (
            !knowledge_week[week_map.get(week) as keyof IGetManageWeekReturn]
          ) {
            knowledge_week[
              week_map.get(week) as keyof IGetManageWeekReturn
            ] = 0;
          }
          knowledge_week[week_map.get(week) as keyof IGetManageWeekReturn] += 1;
        }
      });

      ctx.body = help.json({
        card_number,
        pie_rate,
        note_week,
        knowledge_week,
      });
    } catch (error) {
      ctx.body = help.fail(getErrorMessage(error as any));
      logger.error(error);
    }
  }
}
