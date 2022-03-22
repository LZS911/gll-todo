import { IExampleItem, IReturnMessage } from '../common.d';

export interface IGetExampleListParams {
  id?: number;
}

export interface IGetExampleListReturn extends IExampleItem {}

export interface IAddExampleParams {
  name: string;
}

export interface IAddExampleReturn extends IReturnMessage {}

export interface IRemoveExampleParams {
  id: number;
}

export interface IRemoveExampleReturn extends IReturnMessage {}
