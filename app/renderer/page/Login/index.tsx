import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { localWrapper } from '../../utils';
import { SelectPicture } from './component';
import UserService from '../../api/user';

import './index.less';
import { useLoginState } from '../../hooks/useLoginState';
import { LyButton, LyInput } from '../../components';
import { loginAction } from '../../store/action/login';

const Login = () => {
  const dispatch = useDispatch();
  const { isLogin } = useLoginState();
  const history = useHistory();

  const [inputInfo, setInputInfo] = useState<{
    value: string;
    errorInfo: string;
  }>({
    value: '',
    errorInfo: '',
  });

  const [picName, setPicName] = React.useState('');
  const [picIndex, setPicIndex] = React.useState(0);
  const [picError, setPicError] = React.useState('');

  const handleLogin = () => {
    const msgArr: boolean[] = [];
    if (!/^\w{3,10}$/.test(inputInfo.value)) {
      setInputInfo({ value: '', errorInfo: '请输入合法的用户名!' });
      msgArr.push(true);
    }
    if (!picName) {
      setPicError('请选择头像');
      msgArr.push(true);
    }
    if (msgArr.some((item) => item)) {
      return;
    }
    UserService.login({ user_name: inputInfo.value, user_pic: picName }).then(
      () => {
        dispatch(loginAction.setLoginState(true));
        dispatch(loginAction.setLoginInfo(inputInfo.value, picIndex));
        localWrapper.set('userInfo', {
          isLogin: true,
          userNo: inputInfo.value,
          pic: picIndex,
        });

        history.push('manage');
      }
    );
  };

  const inputChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputInfo({ value: e.target.value, errorInfo: '' });
  }, []);

  const picChange = React.useCallback((picName: string, index: number) => {
    setPicName(picName);
    setPicIndex(index);
    setPicError('');
  }, []);

  useEffect(() => {
    isLogin && history.push('manage');
  }, [history, isLogin]);

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-logo">
          <div className="login-logo-pic"></div>
          <div className="login-logo-text">
            <div className="major-text">成长助手</div>
            <div className="minor-text">自律 | 自由</div>
          </div>
        </div>
        <LyInput
          placeholder="请输入 3-10 位的用户名 (字母、数字、下划线)"
          onChange={inputChange}
          className="login-input"
          errorMessage={inputInfo.errorInfo}
        />

        <SelectPicture onChange={picChange} errorInfo={picError} />
        <LyButton
          btnKey="page-login-button"
          className="login-button"
          text="立即进入 "
          handleClick={handleLogin}
        />
      </div>
    </div>
  );
};

export default Login;
