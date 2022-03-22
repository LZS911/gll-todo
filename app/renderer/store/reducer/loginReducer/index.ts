import { fromJS, Map } from 'immutable';
import { handleActions, Action } from 'redux-actions';
import { localWrapper } from '../../../utils';
import { LoginActionType } from '../../action/login';

type ILoginUserKey =
  | 'userNo'
  | 'isLogin'
  | 'pic';

export type ILoginUserState = Map<ILoginUserKey, any>;


const initState = fromJS({
  userNo: '',
  isLogin: localWrapper.get('userInfo')?.isLogin ?? false,
  pic: ''
})

export const LoginReducer = handleActions<ILoginUserState, any>(
  {
    [LoginActionType.Set_Login_State]: (state, { payload: { isLogin } }: Action<{ isLogin: boolean }>) => {
      return state.set('isLogin', isLogin)
    },
    [LoginActionType.Set_Login_Info]: (state, { payload: { userNo, pic } }: Action<{ userNo: string, pic: string }>) => {
      return state.set('pic', pic).set('userNo', userNo)
    },

  },
  initState as any
)