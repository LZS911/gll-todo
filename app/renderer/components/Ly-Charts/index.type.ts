import { IComponentCommonProps } from '../../common/type';

export interface IBarCharts extends IComponentCommonProps {
  label: string;
  value: number | string;
  itemColor?: string;
  labelColor?: string;
}
