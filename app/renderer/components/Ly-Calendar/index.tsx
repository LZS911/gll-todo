import React from 'react';
import { WeekDayEnum } from '../../common/enum';
import { classnames, range } from '../../utils';
import calcCalendar, { ICalendarMonthPanel } from './calcCalendar';
import { Select, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib';

import './index.less';
import { IAddPlan } from '../../api/plan/index.d';
import EditModal from '../Edit-Modal';

const crossNum = 7;
const verticalNum = 6;
const startYear = 1998;
const sum = crossNum * verticalNum;

interface ILyCalendarProps {
  data: IAddPlan[];
}

export default function LyCalendar(props: ILyCalendarProps) {
  const [pickerMonth, setPickerMonth] = React.useState(
    new Date().getMonth() + 1
  );
  const [pickerYear, setPickerYear] = React.useState(new Date().getFullYear());

  const { currentDate, monthPanelArr, currentYear, currentMonth } =
    React.useMemo(
      () => calcCalendar(sum, pickerMonth, pickerYear),
      [pickerMonth, pickerYear]
    );
  const [showPlanModal, setShowPlanModal] = React.useState('');

  const { data: calendarData } = props;

  const formatDate = (date: number) => {
    return date < 10 ? `0${date}` : date;
  };

  const joinDate = (year: number, month: number, date: number) => {
    return `${year}-${formatDate(month)}-${formatDate(date)}`;
  };

  const generateHeader = () => {
    return Object.values(WeekDayEnum).map((week) => {
      return <th key={week}>{week}</th>;
    });
  };

  const [selectDate, setSelectDate] = React.useState({
    monthSign: 'current',
    currentDate: currentDate,
  });

  const handleClick = (monthPanel: ICalendarMonthPanel) => {
    setSelectDate({
      monthSign: monthPanel.monthSign,
      currentDate: monthPanel.date,
    });
  };

  const generateTitle = (val: ICalendarMonthPanel) => {
    if (val.monthSign === 'current') {
      return joinDate(currentYear, currentMonth, val.date);
    }

    if (val.monthSign === 'prev') {
      return joinDate(currentYear, currentMonth - 1, val.date);
    }

    if (val.monthSign === 'next') {
      return joinDate(currentYear, currentMonth + 1, val.date);
    }

    return '';
  };

  const generateContent = (date: string) => {
    return calendarData.map((item) => {
      if (
        item.start_time.split(' ')[0] === date ||
        item.end_time.split(' ')[0] === date
      ) {
        return (
          <div
            className={`content-plan-${
              item.start_time.split(' ')[0] === date ? 'start' : 'end'
            }`}
            key={item.plan_id}
          >
            <span
              className={`calendar-content-status content-plan-status-${item.plan_status}`}
            ></span>
            <span
              onClick={() => setShowPlanModal(item.plan_content)}
              className="calendar-content-value"
            >
              {' '}
              {item.plan_title}
            </span>
          </div>
        );
      }
      return null;
    });
  };

  const generateBody = () => {
    return monthPanelArr.map((item, index) => {
      return (
        <tr key={index}>
          {item.map((val, index) => {
            return (
              <td
                onClick={() => handleClick(val)}
                className={classnames(
                  [
                    'ly-picker-cell',
                    'ly-picker-cell-in-view',
                    'ly-picker-cell-toDay',
                    'ly-picker-cell-select',
                  ],
                  [
                    true,
                    val.monthSign === 'current',
                    val.date === currentDate && val.monthSign === 'current',
                    selectDate.monthSign === val.monthSign &&
                      selectDate.currentDate === val.date,
                  ]
                )}
                key={index}
                title={generateTitle(val)}
              >
                <div className="ly-picker-cell-inner">
                  <div className="picker-date-value">
                    {formatDate(val.date)}
                  </div>
                  <div className="picker-date-content">
                    {generateContent(generateTitle(val))}
                  </div>
                </div>
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const [panelType, setPanelType] = React.useState('radio_month');

  const handleRadioChange = React.useCallback((e: RadioChangeEvent) => {
    setPanelType(e.target.value);
  }, []);

  return (
    <>
      <div className="ly-calendar">
        <div className="calendar-header">
          <Select
            defaultValue={currentYear}
            style={{ marginRight: 10 }}
            onChange={setPickerYear}
          >
            {range(startYear, currentYear + 20).map((item) => {
              return (
                <Select.Option key={item} value={item}>
                  {item + '年'}
                </Select.Option>
              );
            })}
          </Select>

          {panelType === 'radio_month' && (
            <Select defaultValue={currentMonth} onChange={setPickerMonth}>
              {range(1, 12).map((item) => {
                return (
                  <Select.Option key={item} value={item}>
                    {item + '月'}
                  </Select.Option>
                );
              })}
            </Select>
          )}

          <Radio.Group
            onChange={handleRadioChange}
            className="calendar-switch-model"
            optionType="button"
            defaultValue="radio_month"
            options={[
              {
                label: '月',
                value: 'radio_month',
              },
              {
                label: '年',
                value: 'radio_year',
              },
            ]}
          ></Radio.Group>
        </div>

        <table className="calendar-table">
          <thead>
            <tr>{generateHeader()}</tr>
          </thead>
          <tbody>{generateBody()}</tbody>
        </table>
      </div>

      {!!showPlanModal && (
        <EditModal
          readOnly={true}
          onSave={() => {
            setShowPlanModal('');
          }}
          name="show-plan"
          title="计划详情"
          closeModal={() => {
            setShowPlanModal('');
          }}
          defaultContent={showPlanModal}
        />
      )}
    </>
  );
}
