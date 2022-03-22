import { Form, Input } from 'antd';
import React from 'react';
import { MarkDown } from '../../../../../../components';

const KnowLedge: React.FC = () => {
  return (
    <>
      <>
        <Form.Item
          name="knowledge_title"
          label="标题"
          rules={[
            {
              required: true,
              message: '请输入标题!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="knowledge_content" label="内容">
          <MarkDown
            name="add_knowledge_content"
            defaultContent="- 添加一个知识点"
            size="large"
          />
        </Form.Item>
      </>
    </>
  );
};
export default KnowLedge;
