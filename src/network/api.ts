import axiosModule, { AxiosInstance, AxiosRequestConfig } from "axios";
import { tokenService } from "./tokenService";

const URL = import.meta.env.VITE_API_URL;

const axios = axiosModule.create({
  baseURL: URL,
});

axios.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken(); // или другой способ хранения токена
    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axios };
