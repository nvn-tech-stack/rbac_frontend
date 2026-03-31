import { API } from "..";
import { getApi, putApi } from "../api";

export const getNotificationByUser = async (id: string) => {
  return await getApi(`${API.notification}/user/${id}`);
};

export const updateNotificationByUser = async (
  id: string,
  config?: { data?: any; params?: any },
) => {
  return await putApi(`${API.notification}/${id}`, {
    data: config?.data,
    params: config?.params,
  });
};
