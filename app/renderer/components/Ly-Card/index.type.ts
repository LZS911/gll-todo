export interface ILyCardProps {
  title: string;
  className?: string;
  content?: string;
  confirm?: () => void;
  cancel?: () => void;
  delete?: () => void;
  edit?: () => void;
  view?: () => void;
  style?: { [key in string]: any };
  showEditArea?: boolean;
}
