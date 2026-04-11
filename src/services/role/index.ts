import { API } from "..";

import { getApi, postApi, putApi } from "../api";

export const createRole = async (config: any) => {
  return await postApi(`${API.role}`, config);
};
export const updateRole = async (id: string, config: any) => {
  return await putApi(`${API.role}/${id}`, config);
};
export const updateStatusRole = async (id: string, config: any) => {
  return await putApi(`${API.role}/status/${id}`, config);
};

export const roleLists = async (config: any) => {
  return await getApi(`${API.role}`, config);
};
export const getRoleById = async (id: string) => {
  return await getApi(`${API.role}/${id}`);
};
