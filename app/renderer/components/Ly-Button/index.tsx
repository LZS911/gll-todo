import * as React from 'react';

import './index.less';
import { ILyButton } from './index.type';

const LyButton: React.FC<ILyButton> = (props) => {
  return (
    <button
      data-testid={`ly-button-${props.btnKey}`}
      className={`ly-button ${props.className ?? ''}`}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
};

export default LyButton;
