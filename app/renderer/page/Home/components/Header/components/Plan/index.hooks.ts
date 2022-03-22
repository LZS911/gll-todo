import usePlan from '../../../../../Plan/index.hooks';
import * as React from 'react';
import { FormInstance, message } from 'antd';
import PlanService from '../../../../../../api/plan';
import { useLocation } from 'react-router-dom';
import { TimeFormatEnum } from '../../../../../../common/enum';
import { IAddPlanParam } from '../../../../../../api/plan/index.d';

export default function usePlanModal(
  form: FormInstance<any>,
  closeModal: (saveExit?: string) => void
) {
  const { refreshPlan } = usePlan();
  const location = useLocation();

  const handleSave = React.useCallback(() => {
    return form
      .validateFields()
      .then((value) => {
        const params: IAddPlanParam = {
          plan_title: value.plan_title,
          plan_content: value.plan_content,
          start_time: value.start_time.format(TimeFormatEnum.dateFormatTime),
          end_time: value.end_time.format(TimeFormatEnum.dateFormatTime),
          plan_level: value.plan_level,
        };
        PlanService.addPlan(params).then(() => {
          message.success('添加计划成功!');
          closeModal('add_plan_content');
          if (location.pathname === '/plan') {
            refreshPlan();
          }
        });
      })
      .catch(() => {});
  }, [closeModal, form, location.pathname, refreshPlan]);

  return [handleSave];
}
