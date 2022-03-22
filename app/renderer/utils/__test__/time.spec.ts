/* eslint-disable no-console */
import moment from 'moment';
import { TimeFormatEnum } from '../../common/enum';
import { generateFewDay } from '../time';

describe('generateFewDay', () => {
  it('No parameter moment format should be a week ago', () => {
    const date = generateFewDay() as moment.Moment;
    expect(date.format(TimeFormatEnum.dateFormatDate)).toBe(
      moment().subtract(7, 'day').format(TimeFormatEnum.dateFormatDate),
    );
  });
  it('Specify the number of days when the first parameter should be normal', () => {
    const date = generateFewDay(4) as moment.Moment;
    expect(date.format(TimeFormatEnum.dateFormatMonth)).toBe(
      moment().subtract(2, 'day').format(TimeFormatEnum.dateFormatMonth),
    );
  });
  it('To format the parameters should be normal', () => {
    expect(generateFewDay(5, TimeFormatEnum.dateFormatMonth)).toEqual(
      moment().subtract(5, 'day').format(TimeFormatEnum.dateFormatMonth),
    );
    expect(generateFewDay(7, TimeFormatEnum.dateFormatDate)).toEqual(
      moment().subtract(7, 'day').format(TimeFormatEnum.dateFormatDate),
    );
  });
});
