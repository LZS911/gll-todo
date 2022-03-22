export interface IMenuDataItem {
  path: string;
  name: string;
  exact: boolean;
  component: React.LazyExoticComponent<any>;
}
