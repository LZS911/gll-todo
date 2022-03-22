import { IGetManageWeekReturn } from './../../api/manage/index.d';
import { ICardData } from './index.d';
import { IBarCharts } from '../../components/Ly-Charts/index.type';
import {
  IGetCardManager,
  IGetManageRateReturn,
} from '../../api/manage/index.d';

export const cardData: (cardData: IGetCardManager) => ICardData[] = (
  cardData: IGetCardManager
) => {
  return [
    {
      dataIndex: 'plan_total_num',
      name: '总计划数',
      count: cardData.plan_sum_count,
      background: 'linear-gradient(90deg,rgba(244,107,104,.7),#f46b68)',
    },
    {
      dataIndex: 'plan_completed_num',
      name: '已完成计划',
      count: cardData.plan_successful_count,
      background: 'linear-gradient( 90deg,rgba(11,145,67,.7),#0b9143)',
    },
    {
      dataIndex: 'plan_under_way_num',
      name: '进行中计划',
      count: cardData.plan_underway_count,
      background: `linear-gradient(90deg,rgba(12,174,196,.7),#0caec4)`,
    },
    {
      dataIndex: 'knowledge_total_num',
      name: '知识总量',
      count: cardData.knowledge_count,
      background: `linear-gradient(90deg,rgba(69,17,212,.7),#4511d4)`,
    },
    {
      dataIndex: 'note_num',
      name: '便签数',
      count: cardData.note_count,
      background: `linear-gradient(90deg,rgba(228,160,14,.7),#e4a00e)`,
    },
  ];
};

export const barData: (noteWeek: IGetManageWeekReturn) => IBarCharts[] = (
  noteWeek: IGetManageWeekReturn
) => [
  {
    label: '周一',
    value: noteWeek?.monday ?? 0,
    itemColor: '#1990ff',
  },
  {
    label: '周二',
    value: noteWeek?.tuesday ?? 0,
    itemColor: '#2ec25a',
  },
  {
    label: '周三',
    value: noteWeek?.wednesday ?? 0,
    itemColor: '#1990ff',
  },
  {
    label: '周四',
    value: noteWeek?.thursday ?? 0,
    itemColor: '#facc14',
  },
  {
    label: '周五',
    value: noteWeek?.friday ?? 0,
    itemColor: '#223273',
  },
  {
    label: '周六',
    value: noteWeek?.saturday ?? 0,
    itemColor: '#13c2c2',
  },
  {
    label: '周日',
    value: noteWeek?.sunday ?? 0,
    itemColor: '#93a7ff',
  },
];

export const pieData: (pieRate: IGetManageRateReturn) => IBarCharts[] = (
  pieRate: IGetManageRateReturn
) => [
  {
    label: `完成率 ${pieRate.complete_rate}%`,
    value: pieRate.complete_rate,
  },
  {
    label: `未完成率  ${pieRate.failure_rate}%`,
    value: pieRate.failure_rate,
  },
  {
    label: `进行中  ${pieRate.underway_rate}%`,
    value: pieRate.underway_rate,
  },
  {
    label: `待办  ${pieRate.todo_rate}%`,
    value: pieRate.todo_rate,
  },
];
