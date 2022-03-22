/* tslint:disable no-identical-functions */
/* tslint:disable no-useless-cast */
/* tslint:disable no-unnecessary-type-assertion */
/* tslint:disable no-big-function  */
/* tslint:disable no-duplicate-string  */
import ServiceBase from '../Service.base';
import { AxiosRequestConfig } from 'axios';

import {
  IGetPlanListParams,
  IGetPlanListReturn,
  IAddPlanParams,
  IAddPlanReturn,
  IEditPlanParams,
  IEditPlanReturn,
  IDeletePlanParams,
  IDeletePlanReturn
} from './index.d';

class PlanService extends ServiceBase {
  public getPlanList(params: IGetPlanListParams, options?: AxiosRequestConfig) {
    const paramsData = this.cloneDeep(params);
    return this.get<IGetPlanListReturn>(
      '/api/v1/plan/getPlans',
      paramsData,
      options
    );
  }

  public addPlan(params: IAddPlanParams, options?: AxiosRequestConfig) {
    const paramsData = this.cloneDeep(params);
    return this.post<IAddPlanReturn>(
      '/api/v1/plan/addPlan',
      paramsData,
      options
    );
  }

  public editPlan(params: IEditPlanParams, options?: AxiosRequestConfig) {
    const paramsData = this.cloneDeep(params);
    return this.post<IEditPlanReturn>(
      '/api/v1/plan/editPlan',
      paramsData,
      options
    );
  }

  public deletePlan(params: IDeletePlanParams, options?: AxiosRequestConfig) {
    const paramsData = this.cloneDeep(params);
    return this.get<IDeletePlanReturn>(
      '/api/v1/plan/deletePlan',
      paramsData,
      options
    );
  }
}

export default new PlanService();
