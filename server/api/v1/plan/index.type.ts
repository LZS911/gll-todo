export interface IChangePlanParam {
  plan_title: string;
  plan_id: string;
  plan_content: string;
}

export interface IGetPlanParam {
  start_time?: string;
  end_time?: string;
  plan_status?: string;
}

export interface ISetStatus {
  plan_title: string;
  plan_id: string;
  plan_status: 'successful' | 'delete' | 'failed';
}
