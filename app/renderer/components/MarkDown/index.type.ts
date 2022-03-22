import { SizeEnum } from '../../common/enum';

export type MarkDownType = 'write' | 'preview';
export interface IMarkDownProps {
  size?: keyof typeof SizeEnum;
  onChange?: (val: string) => void;
  defaultContent?: string;
  name: string;
  readonly?: boolean;
  defaultModal?: MarkDownType;
}
