import { $get, $post } from '../axios';
import { AxiosRequestConfig } from 'axios';
import _ from 'lodash';

class ServiceBase {
  protected get<T>(url: string, data: any = {}, options?: AxiosRequestConfig) {
    return $get<T>(url, data, options);
  }

  protected post<T>(url: string, data: any = {}, options?: AxiosRequestConfig) {
    return $post<T>(url, data, options);
  }

  protected cloneDeep(data: any = {}) {
    return _.cloneDeep(data);
  }
}

export default ServiceBase;
