import { createAction } from 'redux-actions';

export enum GetManageType {
  Refresh_Manage = 'Refresh_Manage',
}

export const manageAction = {
  refreshManage: createAction(GetManageType.Refresh_Manage, (refresh: boolean) => {
    return {
      refresh,
    };
  }),
};
