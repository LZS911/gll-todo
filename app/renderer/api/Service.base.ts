import { fetchPost, fetchGet } from '../axios';
import { AxiosRequestConfig } from 'axios';
import _ from 'lodash';

class ServiceBase {
  protected get<T>(url: string, data: any = {}, options?: AxiosRequestConfig) {
    return fetchGet<T>(url, data, options);
  }

  protected post<T>(url: string, data: any = {}, options?: AxiosRequestConfig) {
    return fetchPost<T>(url, data, options);
  }

  protected cloneDeep(data: any = {}) {
    return _.cloneDeep(data);
  }
}

export default ServiceBase;
