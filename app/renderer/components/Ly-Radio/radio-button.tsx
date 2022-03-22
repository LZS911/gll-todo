import React from 'react';
import { IRadioProps } from './index.type';
import useRadio from './index.hooks';

const RadioButton = React.forwardRef<HTMLElement, IRadioProps>((props, ref) => {
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
        <span className="ly-radio-button">{props.children}</span>
      </span>
    </label>
  );
});

export default RadioButton;
