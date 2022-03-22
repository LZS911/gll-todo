import { renderHooksWithRedux } from './../../../utilsTest';
import usePlan from '../index.hooks';
import { act } from '@testing-library/react-hooks';
import { planList } from './mock_plan_list';
import { List } from 'immutable';

describe('usePlan', () => {
  it('should be change after call setup data method', () => {
    const { result } = renderHooksWithRedux(usePlan);

    //init status
    expect(result.current.planList).toEqual(List([]));
    expect(result.current.refresh).toEqual(false);

    act(() => result.current.setPlanList(planList));
    expect(result.current.planList).toEqual(planList);

    act(() => result.current.refreshPlan());
    expect(result.current.refresh).toEqual(true);
  });
});
