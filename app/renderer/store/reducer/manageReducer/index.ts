import { fromJS, Map } from 'immutable';
import { handleActions, Action } from 'redux-actions';
import { GetManageType } from '../../action/manage';

export type IManageState = Map<'refresh', any>;

const initState = fromJS({
  refresh: false,
});

export const manageReducer = handleActions<IManageState, any>(
  {
    [GetManageType.Refresh_Manage]: (
      state,
      { payload: { refresh } }: Action<{ refresh: boolean }>,
    ) => {
      return state.set('refresh', refresh);
    },
  },
  initState as any,
);
