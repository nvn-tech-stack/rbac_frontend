import axios from "axios";

import env from "../config/env";
import toast from "react-hot-toast";

import { getAccessToken } from "../utils/localStorage";
export const baseURL = env.API_URL;

const api = axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    // const refreshToken = getRefreshToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    toast.error("Something went wrong.");

    if (status === 500) {
      if (window.location.pathname !== "/server-error") {
        window.location.href = "/server-error";
      }
    }

    return Promise.reject(error);
  },
);

export const getApi = (url: string, config?: { params?: any }) => {
  return api.get(url, { params: config?.params }).then((res) => res.data);
};

export const postApi = (url: string, config?: { data?: any; params?: any }) => {
  return api
    .post(url, config?.data, { params: config?.params })
    .then((res) => res.data);
};

export const putApi = (url: string, config?: { data?: any; params?: any }) => {
  return api
    .put(url, config?.data, { params: config?.params })
    .then((res) => res.data);
};
export const deleteApi = (
  url: string,
  config?: { data?: any; params?: any },
) => {
  return api
    .post(url, config?.data, { params: config?.params })
    .then((res) => res.data);
};

export default api;
