export interface IGetManagerReturn {
  data: IGetManager;
  code?: number;
}

export interface IGetManagerParam {
  prev: number; //第几个上一周 或者上一个月
}

export interface IGetManager {
  card_number: IGetCardManager;
  pie_rate: IGetManageRateReturn;
  note_week: IGetManageWeekReturn;
  knowledge_week: IGetManageWeekReturn;
}

export interface IGetCardManager {
  note_count: number;
  knowledge_count: number;
  plan_sum_count: number;
  plan_underway_count: number;
  plan_successful_count: number;
}

export interface IGetManageRateReturn {
  complete_rate: number;
  underway_rate: number;
  failure_rate: number;
  todo_rate: number;
}

export interface IGetManageWeekReturn {
  monday?: number;
  tuesday?: number;
  wednesday?: number;
  thursday?: number;
  friday?: number;
  saturday?: number;
  sunday?: number;
}
