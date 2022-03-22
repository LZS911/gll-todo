import moment from 'moment';
import { validatorDate, titleRules } from '../formUtils';

describe('validatorDate', () => {
  it('Start time should be before the end point in time', () => {
    const { validatorStart, validatorEnd } = validatorDate();
    validatorEnd(null, moment().subtract(1, 'day'));
    return validatorStart(null, moment())
      .then(res => {
        expect(res).toBeUndefined();
      })
      .catch(err => {
        expect(err).toBe('开始时间点应在结束时间点之前');
      });
  });

  it(`Title not to '.' start`, () => {
    return titleRules(null, '.243')
      .then()
      .catch(err => {
        expect(err).toBe('标题不能以 . 开始');
      });
  });

  it('The title of the normal', () => {
    return titleRules(null, 'theTitleOfTheNormal')
      .then(res => {
        expect(res).toBeUndefined();
      })
      .catch(err => {});
  });

  it('Title length should be less than 30', () => {
    return titleRules(null, Array.from({ length: 31 }, (_, index) => index).join(''))
      .then()
      .catch(err => {
        expect(err).toBe('标题长度应小于30');
      });
  });
});
