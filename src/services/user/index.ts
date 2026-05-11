import { API } from "..";

import { getApi, postApi, putApi } from "../api";

export const getUserById = async (id: string) => {
  return await getApi(`${API.user}/${id}`);
};

export const getUserByToken = async () => {
  return await getApi(`${API.user}/token`);
};

export const createUser = async (config: any) => {
  return await postApi(`${API.user}`, config);
};

export const userList = async (config: any) => {
  return await getApi(`${API.user}`, config);
};

export const updateUserById = async (id: string, config: any) => {
  return await putApi(`${API.user}/${id}`, config);
};

export const ResendEmail = async (config: any) => {
  return await postApi(`${API.auth}/resend-email`, config);
};

export const userTags = async () => {
  return await getApi(`${API.user}/tags`);
};
