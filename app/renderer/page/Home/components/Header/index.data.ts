import { IRadioGroupOptions } from '../../../../components/Ly-Radio/index.type';
import { ITabs } from './index.d';

export const tabList: ITabs[] = [
  {
    name: '数据大盘',
    path: 'manage',
  },
  {
    name: '计划管理',
    path: 'plan',
  },
  {
    name: '知识管理',
    path: 'knowledge',
  },
  {
    name: '便签管理',
    path: 'note',
  },
];

export const addModalTabList: IRadioGroupOptions[] = [
  {
    label: '计划',
    value: 'plan_type',
  },
  {
    label: '知识',
    value: 'knowledge_type',
  },
  {
    label: '便签',
    value: 'note_type',
  },
];

export const modalTypeMap = new Map<string, string>([
  ['plan', 'plan_type'],
  ['knowledge', 'knowledge_type'],
  ['note', 'note_type'],
  ['manage', 'plan_type'],
]);
