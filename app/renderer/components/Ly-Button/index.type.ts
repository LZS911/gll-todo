import { ReactNode } from 'react';
import { IComponentCommonProps } from '../../common/type';

export interface ILyButton extends IComponentCommonProps {
  handleClick: (e: any) => void;
  text: string | ReactNode;
  icon?: any;
  btnKey: string;
}
