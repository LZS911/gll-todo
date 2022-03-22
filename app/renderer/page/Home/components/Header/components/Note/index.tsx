import { Form, Input } from 'antd';
import React from 'react';
import { MarkDown } from '../../../../../../components';

const Note: React.FC = () => {
  return (
    <>
      <Form.Item
        name="note_title"
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
      <Form.Item name="note_content" label="内容">
        <MarkDown
          name="add_note_content"
          defaultContent="### 添加一个笔记"
          size="large"
        />
      </Form.Item>
    </>
  );
};
export default Note;
