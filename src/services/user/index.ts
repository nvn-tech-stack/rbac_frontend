import { API } from "..";

import { getApi, postApi } from "../api";

export const getUser = async (id: string) => {
  return await postApi(`${API.user}/${id}`);
};

export const getUserByToken = async () => {
  return await getApi(`${API.user}/token`);
};

export const createUser = async (config:any) => {
  return await postApi(`${API.user}}`,config);
};

export const userList = async (config:any) => {
  return await getApi(`${API.user}`,config);
};
