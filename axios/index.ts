/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable promise/always-return */
import axios, { AxiosRequestConfig } from 'axios';
import getErrorMessage from '../app/renderer/utils/getErrorMessage';
import GlobalMessage from '../app/renderer/utils/message';
import { trimDeep } from '../app/renderer/utils/tool';

axios.defaults.baseURL = 'http://127.0.0.1:9985';
axios.defaults.timeout = 180000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  // eslint-disable-next-line consistent-return
  (res: any) => {
    if (+res.status === 200 || +res.status === 201) {
      return res;
    }
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

export function $post<T = any>(
  url: string,
  params: any,
  options?: AxiosRequestConfig
): Promise<T> {
  return new Promise((resolve) => {
    axios
      .post(url, params, options)
      .then(
        (res: any) => {
          if (!res.data.code) {
            GlobalMessage.error(getErrorMessage(res.data.msg));
          }
          resolve(res.data.data);
        },
        (err: any) => {
          GlobalMessage.error(getErrorMessage(err));
        }
      )
      .catch((err: any) => {
        GlobalMessage.error(getErrorMessage(err));
      });
  });
}

export function $get<T = any>(
  url: string,
  params: any,
  options?: AxiosRequestConfig
): Promise<T> {
  return new Promise((resolve) => {
    axios
      .get(url, { ...options, params: trimDeep(params) })
      .then((res: any) => {
        if (!res.data.code) {
          GlobalMessage.error(getErrorMessage(res.data.msg));
        }
        resolve(res.data.data);
      })
      .catch((err: any) => {
        GlobalMessage.error(getErrorMessage(err));
      });
  });
}

export default axios;
