import { ILyModalProps } from '../Ly-Modal/index.type';

export interface IEditModalProps extends ILyModalProps {
  name: string;
  defaultContent: string;
  readOnly?: boolean;
}
