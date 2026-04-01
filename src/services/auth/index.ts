import { API } from "..";
import { postApi } from "../api";

export const login = async (config: any) => {
  return await postApi(`${API.auth}/login`, config);
};

export const register = async (config: any) => {
  return await postApi(`${API.auth}/register`, config);
};

export const forgotPassword = async (config: any) => {
  return await postApi(`${API.auth}/forgot-password`, config);
};

export const resetPassword = (config: any) => {
  return postApi(`${API.auth}/reset-password`, config);
};

export const resendEmail = async (config: any) => {
  return await postApi(`${API.auth}/resend-email`, config);
};
