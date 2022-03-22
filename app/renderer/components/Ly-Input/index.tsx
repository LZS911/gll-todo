import React, { ChangeEvent, forwardRef } from 'react';
import { classnames } from '../../utils';

import './index.less';
import { ILyInput } from './index.type';

const LyInput = forwardRef<HTMLElement, ILyInput>((props, ref) => {
  const { onChange, errorMessage, className, placeholder } = props;

  const [isFocus, setIsFocus] = React.useState(false);

  const handleFocus = () => {
    setIsFocus(!isFocus);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <>
      <div
        style={{ width: props.width }}
        className={classnames(
          ['ly-input', 'ly-input-error', 'ly-input-focus', className],
          [true, !!errorMessage, isFocus, true]
        )}
      >
        {props.icon ?? null}
        <input
          placeholder={placeholder ?? ''}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleFocus}
          ref={ref as any}
        />
      </div>
      {!!errorMessage && (
        <div className="input-error-message">{errorMessage}</div>
      )}
    </>
  );
});

export default LyInput;
