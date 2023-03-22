import { AxiosResponse } from 'axios';
import Request from './request';

import type { RequestConfig } from './request/types';

export type HttpResponse<T> = T;
// 如果你的response data数据格式为code-data-message，可使用interface
// export interface HttpResponse<T> {
//   code: number;
//   message?: string;
//   data?: T;
// }

// 重写返回类型
interface HttpRequestConfig<T, R> extends RequestConfig<HttpResponse<R>> {
  data?: T;
}

const http = new Request({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 1000 * 60 * 5,
  interceptors: {
    // 请求拦截器
    requestInterceptors: (config) => {
      console.log('实例请求');
      return config;
    },
    // 响应拦截器
    responseInterceptors: (result: AxiosResponse) => {
      console.log('实例响应');
      return result;
    },
  },
});

// 不管是GET还是POST请求都使用data
const httpRequest = <D, T>(config: HttpRequestConfig<D, T>) => {
  const { method = 'GET', data } = config;
  const customConfig = { ...config };
  if (method === 'get' || method === 'GET') {
    customConfig.params = data;
  }
  return http.request<HttpResponse<T>>(customConfig);
};

export default httpRequest;
