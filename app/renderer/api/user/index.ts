import { ISuccess } from '../common';
import ServiceBase from '../Service.base';
import { IUserLoginParam } from './index.type';

class UserService extends ServiceBase {
  login(params: IUserLoginParam) {
    return this.post<ISuccess>('/api/v1/user/login', params);
  }
}

export default new UserService();
