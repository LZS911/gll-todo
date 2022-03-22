import { DatePicker, Form, Input, Select } from 'antd';
import * as React from 'react';
import { titleRules, validatorDate } from '../../../../../../utils/formUtils';
import { planLever } from './index.data';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { TimeFormatEnum } from '../../../../../../common/enum';
import { MarkDown } from '../../../../../../components';

const PlanModal: React.FC = () => {
  const { validatorStart, validatorEnd } = validatorDate();

  return (
    <>
      <Form.Item
        name="plan_title"
        label="标题"
        rules={[
          {
            required: true,
            message: '请输入标题!',
          },
          {
            validator: titleRules,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="plan_content" label="内容">
        <MarkDown name="add_plan_content" defaultContent="**添加一个计划**" />
      </Form.Item>
      <Form.Item
        name="plan_level"
        label="等级"
        rules={[
          {
            required: true,
            message: '请选择计划等级!',
          },
        ]}
      >
        <Select options={planLever} />
      </Form.Item>
      <Form.Item
        label="开始时间"
        name="start_time"
        validateFirst={true}
        rules={[
          {
            required: true,
            message: '请选择开始时间!',
          },
          {
            validator: validatorStart,
          },
        ]}
      >
        <DatePicker
          showTime={true}
          format={TimeFormatEnum.dateFormatTime}
          placeholder="开始时间"
          locale={locale}
          allowClear={true}
        />
      </Form.Item>
      <Form.Item
        label="结束时间"
        name="end_time"
        validateFirst={true}
        rules={[
          {
            required: true,
            message: '请选择结束时间!',
          },
          {
            validator: validatorEnd,
          },
        ]}
      >
        <DatePicker
          showTime={true}
          format={TimeFormatEnum.dateFormatTime}
          placeholder="结束时间"
          locale={locale}
          allowClear={true}
        />
      </Form.Item>
    </>
  );
};
export default PlanModal;
