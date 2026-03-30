import { API } from "..";

import { getApi, postApi } from "../api";

export const getUser = (id: string) => {
  return postApi(`${API.user}/${id}`);
};

export const getUserByToken = async () => {
  return getApi(`${API.user}/token`,);
};
