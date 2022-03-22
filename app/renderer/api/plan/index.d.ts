import { PlanTypeEnum } from './enum';

export interface IAddPlan {
  /**
   * 任务状态
   */
  plan_status: PlanTypeEnum;
  /**
   * 计划内容
   */
  plan_content: string;
  /**
   * 计划结束时间
   */
  end_time: string;
  /**
   * 计划开始时间
   */
  start_time: string;
  /**
   * 计划标题
   */
  plan_title: string;
  /**
   * 计划等级
   */
  plan_level: string;
  /**
   * 主键
   */
  plan_id: string;
}

export interface IGetPlanReturn {
  data: IAddPlan[];
  code?: number;
}
export interface IGetPlanParam {
  start_time?: string;
  end_time?: string;
  plan_status?: PlanTypeEnum;
}
export interface IAddPlanParam {
  /**
   * 计划内容
   */
  plan_content: string;
  /**
   * 计划结束时间
   */
  end_time: string;
  /**
   * 计划开始时间
   */
  start_time: string;
  /**
   * 计划标题
   */
  plan_title: string;
  /**
   * 计划等级
   */
  plan_level: string;
}

export interface ISetStatus {
  plan_title: string;
  plan_id: string;
  plan_status: 'successful' | 'delete' | 'failed';
}

export interface IChangePlanParam {
  plan_title: string;
  plan_id: string;
  plan_content: string;
}
