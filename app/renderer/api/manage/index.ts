import { IGetManagerReturn, IGetManagerParam } from './index.d';
import ServiceBase from '../Service.base';

class ManageService extends ServiceBase {
  getManage(param: IGetManagerParam) {
    return this.get<IGetManagerReturn>('/api/v1/manage/getManageData', param);
  }
}
export default new ManageService();
