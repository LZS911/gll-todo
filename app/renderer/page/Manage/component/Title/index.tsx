import React from 'react';
import { Space } from 'antd';
import './index.less';

interface ITitle {
  major: string;
  minor: string;
  link?: JSX.Element;
}
const Title: React.FC<ITitle> = props => {
  return (
    <div className="title">
      <div className="major-title">{props.major}</div>

      <Space>
        <div className="minor-title">{props.minor}</div>
        <div className="link-title">{props.link}</div>
      </Space>
    </div>
  );
};

export default Title;
