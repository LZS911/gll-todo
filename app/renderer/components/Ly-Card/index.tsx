import { MarkDown } from '..';
import { classnames } from '../../utils';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  BookOutlined,
} from '@ant-design/icons';
import './index.less';
import { Space, Tooltip } from 'antd';
import { ILyCardProps } from './index.type';
import useBottomEdit from '../../hooks/useBottomEditScroll';
import { useMemo } from 'react';

export default function LyCard(props: ILyCardProps) {
  const { editStyle, onScroll, handleMouseEnter, handleMouseLeave } =
    useBottomEdit(50, 20);

  const cardContent = useMemo(() => {
    let value = props.content;
    if (props.content?.includes('note:')) {
      value = props.content.replace(/note:.+/g, (match) => {
        const showLabel = match.replace('note:', '');
        return `[${showLabel}](/note?title=${showLabel})`;
      });
    }
    if (props.content?.includes('knowledge:')) {
      value = props.content.replace(/knowledge:.+/g, (match) => {
        const showLabel = match.replace('knowledge:', '');
        return `[${showLabel}](/knowledge?title=${showLabel})`;
      });
    }
    return value;
  }, [props.content]);

  return (
    <div
      data-testid={`card-${props.title}`}
      style={props.style ?? {}}
      className={classnames(
        ['ly-card-item', 'animate__animated animate__zoomIn', props.className],
        [true, true, !!props.className]
      )}
      onScroll={onScroll}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-item-title">
        {props.title.length > 20 ? (
          <Tooltip placement="topLeft" overlay={props.title}>
            {' '}
            {props.title}
          </Tooltip>
        ) : (
          props.title
        )}
      </div>
      <MarkDown
        defaultContent={cardContent}
        size="mini"
        name="show_plan_name"
        readonly={true}
        defaultModal="preview"
      />

      {props.showEditArea !== false && (
        <div className="card-item-editArea" style={editStyle}>
          <Space size={40}>
            {props.confirm && (
              <span
                className="edit-img"
                data-testid="confirm"
                onClick={props.confirm}
              >
                <CheckOutlined />
              </span>
            )}
            {props.edit && (
              <span
                className="edit-img"
                data-testid="edit"
                onClick={props.edit}
              >
                <EditOutlined />
              </span>
            )}
            {props.view && (
              <span
                className="edit-img"
                data-testid="view"
                onClick={props.view}
              >
                <BookOutlined />
              </span>
            )}
            {props.cancel && (
              <span
                className="edit-img"
                data-testid="cancel"
                onClick={props.cancel}
              >
                <CloseOutlined />
              </span>
            )}
            {props.delete && (
              <span
                className="edit-img"
                data-testid="delete"
                onClick={props.delete}
              >
                <DeleteOutlined />
              </span>
            )}
          </Space>
        </div>
      )}
    </div>
  );
}
