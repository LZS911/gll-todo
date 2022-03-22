import { IAddPlan } from './../../../api/plan/index.d';
import { fromJS, Map } from 'immutable';
import { handleActions, Action } from 'redux-actions';
import { GetPlanType } from '../../action/plan';

export type IPlanState = Map<'planList' | 'refresh', any>;

const initState = fromJS({
  planList: [],
  refresh: false,
});

export const PlanReducer = handleActions<IPlanState, any>(
  {
    [GetPlanType.Set_Plan]: (
      state,
      { payload: { planList } }: Action<{ planList: IAddPlan[] }>,
    ) => {
      return state.set('planList', planList);
    },
    [GetPlanType.Refresh_Plan]: (state, { payload: { refresh } }: Action<{ refresh: boolean }>) => {
      return state.set('refresh', refresh);
    },
  },
  initState as any,
);
