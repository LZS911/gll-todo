import moment from 'moment';
import { monthToDay } from '../components/Ly-Calendar/index.data';
import { TimeFormatEnum } from './../common/enum';

export const generateFewDay = (fewDay: number = 7, format?: TimeFormatEnum) => {
  return format
    ? moment().subtract(fewDay, 'day').format(format)
    : moment().subtract(fewDay, 'day');
};

export const getTimeDetail = () => {
  const month = moment().month() + 1;
  const week = moment().weekday();
  const date = moment().date();
  return { month, week, date };
};

// month 格式: YYYY-mm, 2022-03
export const generateFilterDateByMonth = (month: string) => {
  const startTime = month + '-01';
  const currentYear = new Date(month).getFullYear();
  const currentMonth = new Date(month).getMonth() + 1;
  const endTime = month + `-${monthToDay(currentYear).get(currentMonth)}`;

  return [startTime, endTime];
};
