import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import Manage from '..';
import manage from '../../../api/manage';
import plan from '../../../api/plan';
import { renderWithRedux, resolveThreeSecond } from '../../../utilsTest';
import { planList } from '../../Plan/__test__/mock_plan_list';
import { mockManageList } from './mock_manage_list';

describe('test page manage', () => {
  const mockGetManage = () => {
    const spy = jest.spyOn(manage, 'getManage');
    spy.mockImplementation(() => resolveThreeSecond(mockManageList));
    return spy;
  };
  const mockGetPlan = () => {
    const spy = jest.spyOn(plan, 'getPlan');
    spy.mockImplementation(() => resolveThreeSecond(planList));
    return spy;
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
    jest.clearAllMocks();
    cleanup();
  });
  it('should init data from request', async () => {
    const getPlan = mockGetPlan();
    const getManage = mockGetManage();

    expect(getPlan).toBeCalledTimes(0);
    expect(getManage).toBeCalledTimes(0);

    renderWithRedux(<Manage />);

    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getPlan).toBeCalledTimes(1);
    expect(getManage).toBeCalledTimes(1);
    expect(getManage.mock.calls[0][0]).toEqual({
      prev: 0,
    });
  });

  it('should by click out lined search data', async () => {
    const getManage = mockGetManage();
    renderWithRedux(<Manage />);
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getManage).toBeCalledTimes(1);

    fireEvent.click(screen.getByTestId('get-next-data'));
    expect(getManage).toBeCalledTimes(2);
    expect(getManage.mock.calls[1][0]).toEqual({
      prev: 1,
    });

    fireEvent.click(screen.getByTestId('get-prev-data'));
    expect(getManage).toBeCalledTimes(3);
    expect(getManage.mock.calls[2][0]).toEqual({
      prev: 0,
    });

    fireEvent.click(screen.getByTestId('get-prev-data'));
    expect(getManage).toBeCalledTimes(3);
  });
});
