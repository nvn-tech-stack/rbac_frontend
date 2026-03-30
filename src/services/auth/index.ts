import { API } from "..";
import { postApi } from "../api";

export const login = (config: any) => {
  return postApi(`${API.auth}/login`, config);
};

export const register = (config: any) => {
  return postApi(`${API.auth}/register`, config);
};

export const forgotPassword = (config: any) => {
  return postApi(`${API.auth}/forgot-password`, config);
};

export const resetPassword = (config: any) => {
  return postApi(`${API.auth}/reset-password`, config);
};

export const resendEmail = (config: any) => {
  return postApi(`${API.auth}/resend-email`, config);
};
