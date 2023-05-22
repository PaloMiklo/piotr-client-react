import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { GENERAL_CONSTANTS } from '../core/constant';

const http = axios.create({
  baseURL: GENERAL_CONSTANTS.MOCK, // GENERAL_CONSTANTS.BACKEND  redirects to 8080
  timeout: 5000,
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // config.headers['Authorization'] = 'Bearer <token>';

    return config;
  },
  (error: unknown) =>  Promise.reject(error)
);

http.interceptors.response.use(
  (response:  AxiosResponse<any, any>) => response,
  (error: unknown) => Promise.reject(error)
);

export default http;
