import { IAddPlan } from './../../api/plan/index.d';
import { IReduxState } from '../../store/index.type';
import { useDispatch, useSelector } from 'react-redux';
import { planAction } from '../../store/action/plan';

export default function usePlan() {
  const dispatch = useDispatch();
  const setPlanList = (planList: IAddPlan[]) => {
    dispatch(planAction.setPlanList(planList));
  };

  const planList: IAddPlan[] = useSelector((state: IReduxState) => {
    return state.plan.get('planList');
  });

  const refresh = useSelector((state: IReduxState) => {
    return state.plan.get('refresh');
  });

  const refreshPlan = () => {
    dispatch(planAction.refreshPlan(!refresh));
  };

  return {
    setPlanList,
    planList,
    refresh,
    refreshPlan,
  };
}
