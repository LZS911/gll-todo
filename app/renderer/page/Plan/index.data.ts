import { IRadioGroupOptions } from '../../components/Ly-Radio/index.type';
export const planTabList: IRadioGroupOptions[] = [
  {
    value: 'all',
    label: '全部',
  },
  {
    value: 'successful',
    label: '已完成',
  },
  {
    value: 'underway',
    label: '进行中',
  },
  {
    value: 'toDo',
    label: '待办',
  },
  {
    value: 'failed',
    label: '已失败',
  },
];
