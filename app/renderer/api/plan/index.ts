import { ISuccess } from './../common.d';
import {
  IGetPlanReturn,
  IAddPlanParam,
  ISetStatus,
  IChangePlanParam,
  IGetPlanParam,
} from './index.d';
import ServiceBase from '../Service.base';

class PlanService extends ServiceBase {
  addPlan(params: IAddPlanParam) {
    return this.post<ISuccess>('/api/v1/plan/addPlan', params);
  }
  getPlan(param: IGetPlanParam) {
    return this.get<IGetPlanReturn>('/api/v1/plan/getPlan', param);
  }
  setPlan(param: ISetStatus) {
    return this.get<ISuccess>('/api/v1/plan/setStatus', param);
  }
  changePlan(params: IChangePlanParam) {
    return this.post<ISuccess>('/api/v1/plan/changePlan', params);
  }
}

export default new PlanService();
