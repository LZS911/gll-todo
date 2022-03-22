import { ChangeEvent } from 'react';
import { IComponentCommonProps, IFormRules } from '../../common/type';
export interface ILyInput extends IComponentCommonProps {
  width?: string | number;
  icon?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  rules?: IFormRules[];
  errorMessage?: string;
}
