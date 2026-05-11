import { postApi } from "./api";

export const API = {
  user: "/admin/user",
  role: "/admin/role",
  module: "/admin/module",
  auth: "/auth",
  notification: "/admin/notification",
  chat: "/admin/chat",
  upload: "/upload",
};

export const privateUpload = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await postApi(`${API.upload}/sign-url`, {
    data: formData,
  });

  return { file_name: res?.results?.file_name };
};
