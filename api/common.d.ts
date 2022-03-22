export type IExampleItem = Array<{
  id?: number;

  name?: string;
}>;

export interface IPlanItem {
  plan_id: number;

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

export interface IReturnMessage {
  code: number;

  msg?: string;
}
