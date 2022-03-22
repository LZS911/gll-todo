import { IGetManager } from '../../../api/manage/index.d';

export const mockManageList: IGetManager = {
  card_number: {
    note_count: 7,
    knowledge_count: 11,
    plan_sum_count: 14,
    plan_underway_count: 4,
    plan_successful_count: 9,
  },
  pie_rate: { complete_rate: 64.29, underway_rate: 28.57, failure_rate: 7.14, todo_rate: 0 },
  note_week: {},
  knowledge_week: { tuesday: 2, wednesday: 1 },
};
