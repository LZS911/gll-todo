import * as React from 'react';
import { LyButton } from '..';
import { classnames } from '../../utils';

import './index.less';
import { ILyModalProps } from './index.type';

const LyModal: React.FC<ILyModalProps> = (props) => {
  return (
    <div className="ly-modal-root" data-testid="ly-modal">
      <div className="ly-modal-mask"></div>
      <div className="ly-modal-wrap animate__animated animate__zoomIn">
        <div
          className={classnames(
            ['ly-modal', props.className],
            [true, !!props.className]
          )}
        >
          <div className="ly-modal-content">
            <div className="ly-modal-content-title">{props.title}</div>
            {props.showExit === false ? null : (
              <i
                data-testid="modal-exit-icon"
                className="ly-modal-content-icon"
                onClick={props.closeModal}
              >
                x
              </i>
            )}

            <div className="ly-modal-content-children">{props.children}</div>
            <div className="ly-modal-content-footer">
              {props.showExit === false ? null : (
                <LyButton
                  btnKey="modal-cancel-btn"
                  text="取消"
                  handleClick={props.closeModal}
                />
              )}
              <LyButton
                btnKey="modal-confirm-btn"
                text="确认"
                handleClick={props.onSave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LyModal;
