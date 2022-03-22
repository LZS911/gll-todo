/* eslint-disable @typescript-eslint/no-non-null-assertion */
import moment = require('moment');

export function judgeTime(
  targetTime: string | Date,
  timeArr: Array<Date | string | null | undefined>
) {
  const target =
    typeof targetTime === 'string'
      ? new Date(targetTime)?.valueOf()
      : targetTime.valueOf();
  if (timeArr.length !== 2 || !target) {
    return false;
  }
  const start =
    typeof timeArr[0] === 'string'
      ? new Date(timeArr[0])?.valueOf()
      : timeArr[0]?.valueOf();
  const end =
    typeof timeArr[1] === 'string'
      ? new Date(timeArr[1])?.valueOf()
      : timeArr[1]?.valueOf();

  if (!start && !end) {
    return true;
  }
  if (!!start && !!end && target >= start && target <= end) {
    return true;
  }
  if (!start && end && target <= end) {
    return true;
  }
  if (!end && start && target >= start) {
    return true;
  }

  return false;
}

export function getStrDateWeek(str: string) {
  const date = new Date(str);
  if (!date) return null;

  return date.getDay() === 0 ? 7 : date.getDay();
}

export enum TimeFormatEnum {
  dateFormatTime = 'YYYY-MM-DD HH:mm:ss',
  dateFormatDate = 'YYYY-MM-DD',
  dateFormatMonth = 'YYYY-MM',
}

export function generateCurrentDate(
  formatEnum: TimeFormatEnum = TimeFormatEnum.dateFormatTime
) {
  return moment().format(formatEnum);
}

export const generateFewDay = (fewDay = 7) => {
  // eslint-disable-next-line prettier/prettier
  return moment()
    .subtract(fewDay, 'day')
    .format(TimeFormatEnum.dateFormatDate);
};

export const judgmentSameYearAndSameMonth = (
  dateStr: string,
  targetDateStr: string
) => {
  const date = new Date(dateStr);
  const targetDate = new Date(targetDateStr);
  return (
    date.getFullYear() === targetDate.getFullYear() &&
    date.getMonth() === targetDate.getMonth()
  );
};

/**
 *
 * @param prev 第几个上周 为0表示为本周
 */
export const judgeWhetherIsTargetWeek = (prev: number, targetTime: string) => {
  const currentWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();
  return judgeTime(targetTime, [
    generateFewDay(currentWeek + 7 * prev),
    generateFewDay(currentWeek - 7 + 7 * prev),
  ]);
};

export const monthToDay = (currentYear: number) => {
  return new Map<number, number>([
    [1, 31],
    [2, currentYear % 4 ? 29 : 28],
    [3, 31],
    [4, 30],
    [5, 31],
    [6, 30],
    [7, 31],
    [8, 31],
    [9, 30],
    [10, 31],
    [11, 30],
    [12, 31],
  ]);
};

/**
 *
 * @param prev 第几个上一个月 为0表示为本月
 */
export const judgeWhetherIsTargetMonth = (prev: number, targetTime: string) => {
  const currentDay = new Date().getDate();
  const numberTheMonth = monthToDay(new Date().getFullYear()).get(
    new Date().getMonth() + 1
  );
  return judgeTime(targetTime, [
    generateFewDay(currentDay + numberTheMonth! * prev),
    generateFewDay(currentDay - numberTheMonth! + numberTheMonth! * prev),
  ]);
};
