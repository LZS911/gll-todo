import { IAddPlan } from './../../../api/plan/index.d';
import { createAction } from 'redux-actions';
export enum GetPlanType {
  Set_Plan = 'Set_Plan',
  Refresh_Plan = 'Refresh_Plan',
}

export const planAction = {
  setPlanList: createAction(GetPlanType.Set_Plan, (planList: IAddPlan[]) => {
    return {
      planList,
    };
  }),
  refreshPlan: createAction(GetPlanType.Refresh_Plan, (refresh: boolean) => {
    return {
      refresh,
    };
  }),
};
