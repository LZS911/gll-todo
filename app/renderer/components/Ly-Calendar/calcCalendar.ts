import { monthToDay } from './index.data';

export interface ICalendarMonthPanel {
  monthSign: 'prev' | 'current' | 'next';
  currentDay: boolean;
  date: number;
}

export default function calcCalendar(sum: number, pickerMonth?: number, pickerYear?: number) {
  const date = new Date();
  const currentDate = date.getDate();
  const currentDay = date.getDay();
  const currentMonth = pickerMonth ?? date.getMonth() + 1;
  const currentYear = pickerYear ?? date.getFullYear();

  const getWeek = (week: number) => {
    if (week === 0) return 7;
    return week;
  };

  //当月天数
  const currentMonthToDayNumber = monthToDay(currentYear).get(currentMonth) ?? 31;
  //上个月天数
  const prevMonthToDayNumber = monthToDay(currentYear).get(currentMonth - 1) ?? 31;
  //获取当月1号是星期几
  const oneToWeek = getWeek(new Date(currentYear, currentMonth - 1, 1).getDay());

  let monthArr: ICalendarMonthPanel[] = [];

  let currentDateNo = 1;
  let nextDateNo = 1;
  for (let i = 0; i < sum; ++i) {
    if (i < oneToWeek - 1) {
      monthArr[i] = {
        monthSign: 'prev',
        currentDay: false,
        date: prevMonthToDayNumber - oneToWeek + i + 2,
      };
    } else if (currentDateNo <= currentMonthToDayNumber) {
      monthArr[i] = {
        monthSign: 'current',
        currentDay: i === currentDate,
        date: currentDateNo++,
      };
    } else {
      monthArr[i] = {
        monthSign: 'next',
        currentDay: false,
        date: nextDateNo++,
      };
    }
  }

  const monthPanelArr = monthArr.reduce((acc, cur, index) => {
    if (index % 7) {
      acc[Math.floor(index / 7)] = [...acc[Math.floor(index / 7)], cur];
    } else {
      acc.push([cur]);
    }
    return acc;
  }, [] as ICalendarMonthPanel[][]);

  return {
    currentDate,
    currentDay,
    monthArr,
    monthPanelArr,
    currentMonth,
    currentYear,
  };
}
