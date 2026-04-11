import axios from "axios";

import env from "../config/env";
import { QueryClient } from "@tanstack/react-query";

import { clearToken, getAccessToken } from "../utils/localStorage";
export const baseURL = env.API_URL;
const queryClient = new QueryClient();

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

let isLoggingOut = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if ((status === 401 || status === 403) && !isLoggingOut) {
      isLoggingOut = true;
      clearToken();
      queryClient.clear();

      if (window.location.pathname !== "/auth") {
        window.location.replace("/auth");
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
  console.log("api data", config?.data);
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
