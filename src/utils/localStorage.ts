import env from "../config/env";
import { enumOfLocalStrorage } from "./enums";
import crypto from "crypto-js";

const encrypted = (data: any) =>
  crypto.AES.encrypt(JSON.stringify(data), env.ENCRYPTION_KEY).toString();

export const decrypted = (data: any) => {
  const bytes = crypto.AES.decrypt(data, env.ENCRYPTION_KEY);
  return JSON.parse(bytes.toString(crypto.enc.Utf8));
};

export const setToken = (obj: {
  access_token: string;
  refresh_token?: string;
}) => {
  console.log("STORED IN LS:", obj);
  localStorage.setItem(enumOfLocalStrorage.ACCESS_TOKEN, obj.access_token);
  if (obj.refresh_token) {
    localStorage.setItem(enumOfLocalStrorage.REFRESH_TOKEN, obj.refresh_token);
  }
};

export const setLsUser = (user: any) => {
  console.log("STORED IN LS:", user);
  console.log("STORED IN LS encrypted(user):", encrypted(user));
  localStorage.setItem(enumOfLocalStrorage.USER, encrypted(user));
};

export const getAccessToken = () => {
  return localStorage.getItem(enumOfLocalStrorage.ACCESS_TOKEN);
};

export const getUser = () => {
  const user = localStorage.getItem(enumOfLocalStrorage.USER);
  return user ? decrypted(user) : null;
};

export const getRefreshToken = () => {
  return localStorage.getItem(enumOfLocalStrorage.REFRESH_TOKEN);
};

export const clearToken = () => {
  localStorage.removeItem(enumOfLocalStrorage.ACCESS_TOKEN);
  localStorage.removeItem(enumOfLocalStrorage.REFRESH_TOKEN);
  localStorage.removeItem(enumOfLocalStrorage.USER);
};
