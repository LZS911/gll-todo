import axios from 'axios';
import { message } from 'antd';
import getErrorMessage from '../utils/getErrorMessage';

axios.defaults.baseURL = 'http://127.0.0.1:3434';
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
  (res: any) => {
    if (+res.status === 200 || +res.status === 201) {
      return res;
    } else {
      console.log(res.msg);
    }
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

export function fetchPost<T = any>(
  url: string,
  params: any,
  config: any
): Promise<T> {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(
        (res: any) => {
          if (!res.data.code) {
            message.error(res.data.msg);
            // reject(res.data.msg);
            return;
          }
          resolve(res.data);
        },
        (err: any) => {
          reject(err);
        }
      )
      .catch((err: any) => {
        reject(err);
      });
  });
}

export function fetchGet<T = any>(
  url: string,
  params: any,
  config: any
): Promise<T> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res: any) => {
        if (!res.data.code) {
          message.error(res.data.msg);
          return;
          // reject(res.data.msg);
        }
        resolve(res.data);
      })
      .catch((err: any) => {
        message.error(getErrorMessage(err));
      });
  });
}
