import {
  range,
  classnames,
  isArray,
  isBoolean,
  isString,
  myTypeof,
} from '../index';

describe('check type utils', () => {
  it('should return the correct type', () => {
    expect(myTypeof(0)).toBe('number');
    expect(myTypeof('0')).toBe('string');
    expect(myTypeof(null)).toBe('null');
    expect(myTypeof(undefined)).toBe('undefined');
    expect(myTypeof(Symbol(1))).toBe('symbol');
    expect(myTypeof(BigInt(1))).toBe('bigint');
    expect(myTypeof([])).toBe('array');
    expect(myTypeof({})).toBe('object');
    expect(myTypeof(() => {})).toBe('function');
    expect(myTypeof(true)).toBe('boolean');

    expect(isString('123')).toBe(true);
    expect(isString('')).toBe(true);
    expect(isString(0)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(null)).toBe(false);

    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(!!'')).toBe(true);

    expect(isArray([])).toBe(true);
    expect(isArray([123])).toBeTruthy();
    expect(isArray(null)).toBeFalsy();
    expect(isArray(undefined)).toBeFalsy();
    expect(isArray(0)).toBeFalsy();
  });
  it('should return  the correct classnames', () => {
    // name: undefined   condition : undefined
    expect(classnames()).toBe('');

    // name: string  condition : undefined
    expect(classnames('class')).toBe('class');

    // name: Array<string | undefined>    condition: undefined
    expect(classnames([, 'class'])).toBe('class');

    // name: Array<string | undefined>    condition: boolean
    expect(classnames([undefined, 'class'], false)).toBe('');

    // name: Array<undefined>     condition: undefined
    expect(classnames([,])).toBe('');

    // name: Array<undefined>     condition: boolean
    expect(classnames([,])).toBe('');

    // name:string[]  condition: undefined
    expect(classnames(['class1', 'class2'])).toBe('class1 class2');

    // name: string[]  condition : boolean
    expect(classnames(['class1', 'class2'], true)).toBe('class1 class2');
    expect(classnames(['class1'], false)).toBe('');

    // name : string  condition : boolean
    expect(classnames('class1', false)).toBe('');
    expect(classnames('class1', true)).toBe('class1');
    expect(classnames('class1 class2', true)).toBe('class1 class2');

    // name : string      condition : boolean[]
    expect(classnames('class1 class2', [true, true, true])).toBe(
      'class1 class2'
    );
    expect(classnames('class1 class2', [true, true, false])).toBe('');

    // name : string[]  condition : boolean[]
    expect(classnames(['class1', 'class2'], [true])).toBe('class1');
    expect(classnames(['class1', 'class2', 'class3'], [true, true])).toBe(
      'class1 class2'
    );
    expect(classnames(['class1', 'class2', 'class3'], [true, true, true])).toBe(
      'class1 class2 class3'
    );
    expect(
      classnames(['class1', 'class2', 'class3 class4'], [true, true, true])
    ).toBe('class1 class2 class3 class4');
    expect(
      classnames(['class1', 'class2', 'class3'], [true, false, true])
    ).toBe('class1 class3');
    expect(classnames(['class1', 'class2'], [])).toBe('');

    // name : string, condition: null
    expect(classnames('class1 class2', null)).toBe('class1 class2');
    // name : string[], condition: null
    expect(classnames(['class1', 'class2'], null)).toBe('class1 class2');
    // name : Array<string | undefined> , condition: null
    expect(classnames([, 'class1'], null)).toBe('class1');
  });
});

describe('range', () => {
  it('should continuous increasing 1 when step is default value', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('should follow the third parameter add', () => {
    expect(range(0, 5, 1)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(range(0, 5, 2)).toEqual([0, 2, 4]);
    expect(range(0, 3, 3)).toEqual([0, 3]);
  });
});
