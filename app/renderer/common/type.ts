import { SizeEnum } from './enum';

export type Dictionary = {
  [key: string]: string | number | boolean | Dictionary | string[] | undefined;
};
export interface IFormRules {
  required?: boolean;
  message?: string;
  validate?: (rules: IFormRules[], value: string) => Promise<string>;
  trigger?: string | string[];
}

export interface IComponentCommonProps {
  className?: string;
  size?: keyof typeof SizeEnum;
  name?: string;
}

export interface IWarnProps {
  title?: string;
  content?: string;
  onCancel?: () => void;
  cancelText?: string;
  onOk: () => void;
  okText?: string;
  okButtonProps?: string;
  closable?: boolean;
}
