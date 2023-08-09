import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";


const http = axios.create({
  baseURL: window.location.origin,
  timeout: 5000
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    // config.headers['Authorization'] = 'Bearer <token>';
    return config;
  },
  (error: AxiosError<unknown>) => Promise.reject(error)
);

http.interceptors.response.use(
  (response: AxiosResponse<unknown, unknown>) => response,
  (error: AxiosError<unknown>) => Promise.reject(error)
);

export default http;
