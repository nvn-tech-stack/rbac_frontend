import { API } from "..";
import { getApi } from "../api";

 

export const getModules = async (config: any) => {
  return await getApi(`${API.module}`, config);
};
