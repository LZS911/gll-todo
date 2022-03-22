import { IReduxState } from '../../store/index.type';
import { useSelector } from 'react-redux';

const useLoginState = () => {
  const loginState = useSelector((state: IReduxState) => {
    return {
      isLogin: state.login.get('isLogin'),
    };
  });

  return loginState;
};

export { useLoginState };
