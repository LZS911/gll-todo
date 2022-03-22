/* tslint:disable no-identical-functions */
/* tslint:disable no-useless-cast */
/* tslint:disable no-unnecessary-type-assertion */
/* tslint:disable no-big-function  */
/* tslint:disable no-duplicate-string  */
import ServiceBase from '../Service.base';
import { AxiosRequestConfig } from 'axios';

import {
  IGetExampleListParams,
  IGetExampleListReturn,
  IAddExampleParams,
  IAddExampleReturn,
  IRemoveExampleParams,
  IRemoveExampleReturn
} from './index.d';

class ExampleService extends ServiceBase {
  public getExampleList(
    params: IGetExampleListParams,
    options?: AxiosRequestConfig
  ) {
    const paramsData = this.cloneDeep(params);
    return this.get<IGetExampleListReturn>(
      '/api/v1/example/getExample',
      paramsData,
      options
    );
  }

  public addExample(params: IAddExampleParams, options?: AxiosRequestConfig) {
    const paramsData = this.cloneDeep(params);
    return this.post<IAddExampleReturn>(
      '/api/v1/example/addExample',
      paramsData,
      options
    );
  }

  public removeExample(
    params: IRemoveExampleParams,
    options?: AxiosRequestConfig
  ) {
    const paramsData = this.cloneDeep(params);
    return this.post<IRemoveExampleReturn>(
      '/api/v1/example/removeExample',
      paramsData,
      options
    );
  }
}

export default new ExampleService();
