import { ReactNode } from 'react';
import { IComponentCommonProps } from '../../common/type';

export interface IRadioProps extends IComponentCommonProps {
  /**
   * label值
   */
  children: string | JSX.Element;
  /**
   * value值
   */
  value?: any;
  /**
   * 单选框change事件
   */
  onChange?: (e?: any) => void;
  ref?: any;
  /**
   * 是否不可用
   */
  disabled?: boolean;
  /**
   * 是否选中
   */
  checked?: boolean;
  /**
   * 模式, 默认或者按钮
   */
  modelType?: 'default' | 'button';
}

export interface IRadioGroupOptions {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface IRadioGroupProps extends IComponentCommonProps {
  children?: ReactNode;
  /**
   * change事件
   */
  onChange?: (e?: any) => void;
  /**
   * 默认选中的值
   */
  defaultValue?: any;
  /**
   * 禁用所有子项
   */
  disabled?: boolean;
  /**
   * 以配置形式设置子元素
   */
  options?: string[] | Array<IRadioGroupOptions>;
  /**
   *  配置子元素类型
   */
  optionType?: 'default' | 'button';
}
