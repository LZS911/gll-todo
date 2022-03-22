import { IReduxState } from '../../store/index.type';
import { useDispatch, useSelector } from 'react-redux';
import { manageAction } from '../../store/action/manage';

export default function useManage() {
  const dispatch = useDispatch();
  const refresh = useSelector((state: IReduxState) => {
    return state.manage.get('refresh');
  });

  const refreshManage = () => {
    dispatch(manageAction.refreshManage(!refresh));
  };

  return {
    refresh,
    refreshManage,
  };
}
