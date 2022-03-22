import { IPlanItem, IReturnMessage } from '../common.d';

export interface IGetPlanListParams {
  plan_id?: string;

  is_one_day?: boolean;

  is_important?: boolean;

  is_tips?: boolean;

  end_date?: string;

  is_repeat?: boolean;

  is_complete?: boolean;
}

export interface IGetPlanListReturn {
  data?: IPlanItem[];

  total_nums?: number;
}

export interface IAddPlanParams {
  plan_content: string;

  is_complete: boolean;

  plan_step?: string;

  is_one_day?: boolean;

  is_important?: boolean;

  is_tips?: boolean;

  end_date?: string;

  is_repeat?: boolean;

  file?: any;
}

export interface IAddPlanReturn extends IReturnMessage {}

export interface IEditPlanParams extends IPlanItem {}

export interface IEditPlanReturn extends IReturnMessage {}

export interface IDeletePlanParams {
  plan_id: number;
}

export interface IDeletePlanReturn extends IReturnMessage {}
