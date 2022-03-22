import React, { forwardRef } from 'react';
import { IRadioProps } from './index.type';
import RadioGroup from './radio-group';
import RadioButton from './radio-button';
import useRadio from './index.hooks';

import './index.less';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<
    IRadioProps & React.RefAttributes<HTMLElement>
  > {
  Group: typeof RadioGroup;
  Button: typeof RadioButton;
}

const DefaultRadio = forwardRef<HTMLElement, IRadioProps>((props, ref) => {
  const { checked, disabled, handleChange } = useRadio(props);

  return (
    <label
      className={`ly-radio-wrapper ${
        disabled ? `ly-radio-wrapper-disabled` : ''
      }`}
      onClick={handleChange}
    >
      <span
        className={`ly-radio ${checked ? 'ly-radio-checked' : ''} ${
          disabled ? 'ly-radio-disabled' : ''
        }`}
      >
        <input
          onChange={() => void 0}
          checked={checked}
          value={props.value ?? ''}
          className="ly-radio-input"
          type="radio"
          ref={ref as any}
        />
        <span className="ly-radio-inner"></span>
      </span>
      <span>{props.children}</span>
    </label>
  );
});

const Radio = DefaultRadio as CompoundedComponent;
Radio.Group = RadioGroup;
Radio.Button = RadioButton;
export default Radio;
