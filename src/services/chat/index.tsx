import { API } from "..";
import { getApi, postApi, deleteApi, putApi } from "../api";

export const create = async (config: any) => {
  return await postApi(`${API.chat}`, config);
};

export const update = async (chatId: string, config: any) => {
  return await putApi(`${API.chat}/${chatId}`, config);
};

export const remove = async (chatId: string) => {
  return await deleteApi(`${API.chat}/${chatId}`);
};

export const list = async (config: any) => {
  return await getApi(`${API.chat}`, config);
};
