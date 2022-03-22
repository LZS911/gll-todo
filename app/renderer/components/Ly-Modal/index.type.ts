import { IComponentCommonProps } from '../../common/type';

export interface ILyModalProps extends IComponentCommonProps {
  title: string;
  closeModal: () => void;
  onSave: (value: string) => void;
  showExit?: boolean;
}
