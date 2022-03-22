import React from 'react';
import Radio from '.';
import { RadioGroupContextProvider } from './context';
import { IRadioGroupProps } from './index.type';
import { isString } from '../../utils';
import './index.group.less';

const RadioGroup = (props: IRadioGroupProps) => {
  const [value, setValue] = React.useState<any>(props.defaultValue ?? '');
  const changeHandle = React.useCallback(
    (val: any) => {
      setValue(val);
      props.onChange && props.onChange(val);
    },
    [setValue]
  );
  const generateOptions = () => {
    return (
      <div
        className={`ly-radio-group ${props.className ? props.className : ''}`}
      >
        {props.options?.map((option: any, index: number) => {
          if (isString(option)) {
            return props.optionType === 'button' ? (
              <Radio.Button
                onChange={changeHandle}
                checked={option === value}
                value={option}
                key={`${option}-${index}`}
                disabled={props.disabled}
              >
                {option}
              </Radio.Button>
            ) : (
              <Radio
                onChange={changeHandle}
                checked={option === value}
                value={option}
                key={`${option}-${index}`}
                disabled={props.disabled}
              >
                {option}
              </Radio>
            );
          } else {
            return props.optionType === 'button' ? (
              <Radio.Button
                onChange={changeHandle}
                checked={option.value === value}
                value={option.value}
                key={`${option.label}-${index}`}
                disabled={props.disabled}
              >
                {option.label}
              </Radio.Button>
            ) : (
              <Radio
                onChange={changeHandle}
                checked={option.value === value}
                value={option.value}
                key={`${option.label}-${index}`}
                disabled={props.disabled}
              >
                {option.label}
              </Radio>
            );
          }
        })}
      </div>
    );
  };

  const generateChildren = () => {
    return (
      <RadioGroupContextProvider
        value={{
          onChange: changeHandle,
          value,
          disabled: props.disabled ?? false,
        }}
      >
        <div className="ly-radio-group">{props.children}</div>
      </RadioGroupContextProvider>
    );
  };

  return !!props.options ? generateOptions() : generateChildren();
};

export default RadioGroup;
