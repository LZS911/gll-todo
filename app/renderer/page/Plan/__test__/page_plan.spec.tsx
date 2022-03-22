import { fireEvent, screen, waitFor, cleanup } from '@testing-library/react';
import * as React from 'react';

import Plan from '..';
import plan from '../../../api/plan';
import { renderWithRedux, resolveThreeSecond } from '../../../utilsTest';
import { planList } from './mock_plan_list';
import { planTabList } from '../index.data';
import { PlanTypeEnum } from '../../../api/plan/enum';
import { TimeFormatEnum } from '../../../common/enum';
import moment from 'moment';

const generateCardTestId = (plan_status: PlanTypeEnum) => {
  return `card-${planList.find(item => item.plan_status === plan_status)?.title ?? ''}`;
};

describe('test plan page', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
    jest.clearAllTimers();
    cleanup();
  });

  const mockRequest = () => {
    const spy = jest.spyOn(plan, 'getPlan');
    spy.mockImplementation(() => resolveThreeSecond(planList));
    return spy;
  };

  const mockSetPlan = () => {
    const spy = jest.spyOn(plan, 'setPlan');
    spy.mockImplementation((() => resolveThreeSecond(null)) as any);
    return spy;
  };

  const mockChangePlan = () => {
    const spy = jest.spyOn(plan, 'changePlan');
    spy.mockImplementation((() => resolveThreeSecond(null)) as any);
    return spy;
  };

  it('should get plan data from request', async () => {
    const getPlan = mockRequest();
    expect(getPlan).toBeCalledTimes(0);
    const { container } = renderWithRedux(<Plan />);

    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(getPlan).toBeCalledTimes(1);
    expect(getPlan.mock.calls[0][0]).toEqual({
      plan_status: PlanTypeEnum.underway,
      filter_date: moment().format(TimeFormatEnum.dateFormatMonth),
    });

    screen.getByText(planList[0].title.trim());
    screen.getByText(planList[1].title.trim());
    screen.getByText(planList[2].title.trim());

    expect(container).toMatchSnapshot();
  });

  it('should filter the data through the query conditions', async () => {
    const getAllPlanList = mockRequest();
    expect(getAllPlanList).toBeCalledTimes(0);

    const { container } = renderWithRedux(<Plan />);

    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getAllPlanList).toBeCalledTimes(1);

    //date picker
    const filter_data_by_month_date_picker = screen.getByTestId('date-picker');
    fireEvent.mouseDown(filter_data_by_month_date_picker);
    fireEvent.change(filter_data_by_month_date_picker, { target: { value: '2021-08' } });
    // Why do you need this line of code?
    // https://stackoverflow.com/questions/61949443/how-to-test-ant-design-date-picker-using-testing-library-react
    fireEvent.click(document.querySelectorAll('.ant-picker-cell-selected')[0]);
    expect(getAllPlanList).toBeCalledTimes(2);
    expect(getAllPlanList.mock.calls[1][0]).toEqual({
      plan_status: PlanTypeEnum.underway,
      filter_date: '2021-08',
    });
    //radio group
    // fireEvent.click(screen.getByLabelText(''))
    //should radio group default value is underway
    const underway_radio = screen.getByLabelText(
      planTabList.find(item => item.value === 'underway')?.label!,
    ) as HTMLInputElement;
    expect(underway_radio.checked).toBeTruthy();

    //click radio filter plan list
    const all_radio = screen.getByLabelText(
      planTabList.find(item => item.value === 'all')?.label!,
    ) as HTMLInputElement;
    fireEvent.click(all_radio);
    expect(all_radio.checked).toBeTruthy();
    expect(underway_radio.checked).toBeFalsy();
    expect(getAllPlanList).toBeCalledTimes(3);
    expect(getAllPlanList.mock.calls[2][0]).toEqual({
      plan_status: 'all',
      filter_date: '2021-08',
    });

    const successful_radio = screen.getByLabelText(
      planTabList.find(item => item.value === 'successful')?.label!,
    ) as HTMLInputElement;
    fireEvent.click(successful_radio);
    expect(successful_radio.checked).toBeTruthy();
    expect(all_radio.checked).toBeFalsy();
    expect(underway_radio.checked).toBeFalsy();
    expect(getAllPlanList).toBeCalledTimes(4);
    expect(getAllPlanList.mock.calls[3][0]).toEqual({
      plan_status: 'successful',
      filter_date: '2021-08',
    });

    const toDo_radio = screen.getByLabelText(
      planTabList.find(item => item.value === 'toDo')?.label!,
    ) as HTMLInputElement;
    fireEvent.click(toDo_radio);
    expect(toDo_radio.checked).toBeTruthy();
    expect(all_radio.checked).toBeFalsy();
    expect(underway_radio.checked).toBeFalsy();
    expect(successful_radio.checked).toBeFalsy();
    expect(getAllPlanList).toBeCalledTimes(5);
    expect(getAllPlanList.mock.calls[4][0]).toEqual({
      plan_status: 'toDo',
      filter_date: '2021-08',
    });

    const failed_radio = screen.getByLabelText(
      planTabList.find(item => item.value === 'failed')?.label!,
    ) as HTMLInputElement;
    fireEvent.click(failed_radio);
    expect(failed_radio.checked).toBeTruthy();
    expect(toDo_radio.checked).toBeFalsy();
    expect(all_radio.checked).toBeFalsy();
    expect(underway_radio.checked).toBeFalsy();
    expect(successful_radio.checked).toBeFalsy();
    expect(getAllPlanList).toBeCalledTimes(6);
    expect(getAllPlanList.mock.calls[5][0]).toEqual({
      plan_status: 'failed',
      filter_date: '2021-08',
    });

    expect(container).toMatchSnapshot();
  });

  it('should be able to modify the plan status normally when status is underway or todo', async () => {
    const getPlanList = mockRequest();
    const setPlanStatus = mockSetPlan();
    const { container } = renderWithRedux(<Plan />);
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getPlanList).toBeCalledTimes(1);
    expect(setPlanStatus).toBeCalledTimes(0);
    expect(container).toMatchSnapshot();
    const underway_plan = screen.getByTestId(generateCardTestId(PlanTypeEnum.underway));

    fireEvent.mouseEnter(underway_plan);
    fireEvent.click(screen.getByTestId('confirm'));
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getPlanList).toBeCalledTimes(2);
    expect(setPlanStatus).toBeCalledTimes(1);
    const underwayPlanData = planList.find(item => item.plan_status === PlanTypeEnum.underway)!;
    expect(setPlanStatus.mock.calls[0][0]).toEqual({
      plan_key: underwayPlanData.key,
      status: 'successful',
      title: underwayPlanData.title,
    });

    fireEvent.mouseEnter(underway_plan);
    fireEvent.click(screen.getByTestId('cancel'));
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getPlanList).toBeCalledTimes(3);
    expect(setPlanStatus).toBeCalledTimes(2);
    expect(setPlanStatus.mock.calls[1][0]).toEqual({
      plan_key: underwayPlanData.key,
      status: 'failed',
      title: underwayPlanData.title,
    });

    fireEvent.mouseEnter(underway_plan);
    fireEvent.click(screen.getByTestId('delete'));
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getPlanList).toBeCalledTimes(4);
    expect(setPlanStatus).toBeCalledTimes(3);
    expect(setPlanStatus.mock.calls[2][0]).toEqual({
      plan_key: underwayPlanData.key,
      status: 'delete',
      title: underwayPlanData.title,
    });
  });

  it('should not be able to modify the plan status when status is failure or success', async () => {
    const getPlanList = mockRequest();
    renderWithRedux(<Plan />);
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getPlanList).toBeCalledTimes(1);

    const failed_plan = screen.getByTestId(generateCardTestId(PlanTypeEnum.failed));
    fireEvent.mouseEnter(failed_plan);
    expect(failed_plan).toMatchSnapshot();

    const successful_plan = screen.getByTestId(generateCardTestId(PlanTypeEnum.successful));
    fireEvent.mouseEnter(successful_plan);
    expect(successful_plan).toMatchSnapshot();
  });

  it('should be able to open pop-up windows when viewing and editing', async () => {
    const getPlanList = mockRequest();
    const changPlan = mockChangePlan();
    const { baseElement } = renderWithRedux(<Plan />);
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(changPlan).toBeCalledTimes(0);
    expect(getPlanList).toBeCalledTimes(1);

    const underway_plan = screen.getByTestId(generateCardTestId(PlanTypeEnum.underway));
    fireEvent.mouseEnter(underway_plan);
    fireEvent.click(screen.getByTestId('edit'));

    expect(baseElement).toMatchSnapshot();

    fireEvent.click(screen.getByTestId('ly-button-modal-confirm-btn'));
    expect(baseElement).toMatchSnapshot();

    fireEvent.click(screen.getByTestId('view'));
    fireEvent.click(screen.getByTestId('ly-button-modal-confirm-btn'));
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(changPlan).toBeCalledTimes(1);
    const underwayPlanData = planList.find(item => item.plan_status === PlanTypeEnum.underway)!;

    expect(changPlan.mock.calls[0][0]).toEqual({
      title: underwayPlanData.title,
      key: underwayPlanData.key,
      content: underwayPlanData.content,
    });
    expect(getPlanList).toBeCalledTimes(2);

    expect(baseElement).toMatchSnapshot();

    fireEvent.click(screen.getByTestId('edit'));
    fireEvent.click(screen.getByTestId('ly-button-modal-cancel-btn'));
    expect(baseElement).toMatchSnapshot();

    fireEvent.click(screen.getByTestId('view'));
    await waitFor(() => {
      jest.advanceTimersByTime(3000);
    });
    fireEvent.click(screen.getByTestId('ly-button-modal-cancel-btn'));
    expect(baseElement).toMatchSnapshot();
  });
});
