import { message, Radio, RadioChangeEvent, DatePicker, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import PlanService from '../../api/plan';
import { classnames } from '../../utils';
import { planTabList } from './index.data';
import usePlan from './index.hooks';
import { IAddPlan, IChangePlanParam } from '../../api/plan/index.d';
import './index.less';
import { TimeFormatEnum } from '../../common/enum';
import moment from 'moment';
import { PlanTypeEnum } from '../../api/plan/enum';
import { EditModal, LyCard } from '../../components';
import { generateFilterDateByMonth } from '../../utils/time';

export default function Plan() {
  const { planList, setPlanList, refresh, refreshPlan } = usePlan();
  const [radioType, setRadioType] = useState('underway');
  const [pickerMonth, setPickerMonth] = useState<string>(
    moment().format(TimeFormatEnum.dateFormatMonth)
  );

  const [modalTitle, setModalTitle] = useState<'修改计划' | '查看计划'>(
    '修改计划'
  );
  const [showEdit, setShowEdit] = useState(false);
  const [currentEditPlan, setCurrentEditPlan] = useState<IAddPlan>({} as any);
  const radioChange = (e: RadioChangeEvent) => {
    setRadioType(e.target.value);
  };
  useEffect(() => {
    const [startTime, endTime] = generateFilterDateByMonth(pickerMonth);
    PlanService.getPlan({
      plan_status: radioType as PlanTypeEnum,
      start_time: startTime,
      end_time: endTime,
    }).then((res) => {
      setPlanList(res.data);
    });
  }, [refresh, radioType, pickerMonth]);

  const setPlanStatus = (
    status: 'successful' | 'failed' | 'delete',
    plan: IAddPlan
  ) => {
    PlanService.setPlan({
      plan_id: plan.plan_id,
      plan_status: status,
      plan_title: plan.plan_title,
    }).then(() => {
      message.success('状态修改成功!');
      refreshPlan();
    });
  };

  const changeMonth = (_: any, str: string) => {
    setPickerMonth(str);
  };

  const changePlan = React.useCallback(
    (value: string) => {
      if (modalTitle === '修改计划') {
        const param: IChangePlanParam = {
          plan_title: currentEditPlan.plan_title,
          plan_id: currentEditPlan.plan_id,
          plan_content: value,
        };

        PlanService.changePlan(param).then(() => {
          message.success('修改成功!');
          setShowEdit(false);
          refreshPlan();
        });
      } else {
        setShowEdit(false);
      }
    },
    [
      modalTitle,
      currentEditPlan.plan_title,
      currentEditPlan.plan_id,
      refreshPlan,
    ]
  );

  return (
    <div className="plan-content">
      <Space>
        <Radio.Group
          onChange={radioChange}
          defaultValue={radioType}
          optionType="button"
          options={planTabList}
          data-testid="radio-group-plan-status"
        />

        <DatePicker
          format={TimeFormatEnum.dateFormatMonth}
          defaultValue={moment()}
          onChange={changeMonth}
          picker="month"
          className="filter-date"
          data-testid="date-picker"
        />
      </Space>

      <div className="plan-content-box">
        {planList.map((item) => {
          return (
            <LyCard
              title={item.plan_title}
              key={item.plan_id}
              className={classnames([
                'plan-item',
                `plan-item-${item.plan_status}`,
              ])}
              content={item.plan_content}
              confirm={() => setPlanStatus('successful', item)}
              cancel={() => setPlanStatus('failed', item)}
              delete={() => setPlanStatus('delete', item)}
              view={() => {
                setModalTitle('查看计划');
                setShowEdit(true);
                setCurrentEditPlan(item);
              }}
              edit={() => {
                setModalTitle('修改计划');
                setShowEdit(true);
                setCurrentEditPlan(item);
              }}
              showEditArea={
                item.plan_status !== PlanTypeEnum.successful &&
                item.plan_status !== PlanTypeEnum.failed
              }
            />
          );
        })}
      </div>

      {!!showEdit && (
        <EditModal
          name="edit-plan"
          title={modalTitle}
          closeModal={() => setShowEdit(false)}
          onSave={changePlan}
          defaultContent={currentEditPlan.plan_content}
          readOnly={modalTitle === '查看计划'}
        />
      )}
    </div>
  );
}
