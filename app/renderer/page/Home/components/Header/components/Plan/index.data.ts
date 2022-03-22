import { PlanLevel } from './../../../../../../api/plan/enum';
export const planLever: { label: string; value: PlanLevel }[] = [
  {
    label: '紧急',
    value: PlanLevel.exigency,
  },
  {
    label: '重要',
    value: PlanLevel.importance,
  },
  {
    label: '一般',
    value: PlanLevel.general,
  },
  {
    label: '不重要',
    value: PlanLevel.unimportance,
  },
];
