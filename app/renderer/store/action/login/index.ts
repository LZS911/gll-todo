import { createAction } from 'redux-actions';

export enum LoginActionType {
  Set_Login_State = 'Set_Login_State',
  Set_Login_Info = 'Set_Login_Info',
}

export const loginAction = {
  setLoginInfo: createAction(
    LoginActionType.Set_Login_Info,
    (userNo: string, pic: number) => {
      return {
        userNo,
        pic,
      };
    }
  ),
  setLoginState: createAction(
    LoginActionType.Set_Login_State,
    (isLogin: boolean) => {
      return { isLogin };
    }
  ),
};
