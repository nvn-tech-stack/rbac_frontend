import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";

import type { User } from "../../utils/interfaces";
import { setToken, setLsUser, getUser } from "../../utils/localStorage";
import {
  register,
  login,
  resendEmail,
  forgotPassword,
} from "../../services/auth";

import { useToast } from "../Toast";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  mutateRegister: any;
  mutateLogin: any;
  isPending: boolean;
  handleSendEmail: (config: any) => void;
  handleForgotPassword: (config: any) => void;
};
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthProvider = () => {
  const [user, setUser] = useState(getUser());
  const showToast = useToast();
  const navigate = useNavigate();

  const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const accessToken = data?.results?.access_token;
      const refreshToken = data?.results?.user?.refresh_token;

      setToken({ access_token: accessToken, refresh_token: refreshToken });
      const userData = data?.results?.user;
      console.log("AuthContextProvider userData", userData);
      setLsUser(userData);
      setUser(userData);
      showToast("login successfully", "success");
      navigate("/admin", { replace: true });
    },
    onError: (error: any) => {
      console.error("Login error:", error?.response.data?.message || error);
      const message = error?.response.data?.message || "Something went wrong!";
      showToast(message, "error");
    },
  });

  const { mutate: mutateRegister, isPending: isRegisterPending } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      showToast("Registered successfully, Please login now!", "success");
    },
    onError: (error: any) => {
      const message = error?.response.data?.message || "Something went wrong!";
      showToast(message, "error");
    },
  });

  const { mutate: mutateResendEmail } = useMutation({
    mutationFn: resendEmail,
    onSuccess: () => {
      showToast("Email sent successfully!", "success");
    },
    onError: (error: any) => {
      const message = error?.response.data?.message || "Something went wrong!";
      showToast(message, "error");
    },
  });

  const handleSendEmail = (email: string) => {
    mutateResendEmail({ data: { email } });
  };

  const { mutate: mutateForgotPassword } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      showToast("Password changed successfully!", "success");
    },
    onError: (error: any) => {
      const message = error?.response.data?.message || "Something went wrong!";
      showToast(message, "error");
    },
  });

  const handleForgotPassword = ({
    token,
    newPassword,
  }: {
    token: string;
    newPassword: string;
  }) => {
    mutateForgotPassword({ data: { newPassword }, params: { token } });
  };

  const isPending = isLoginPending || isRegisterPending;

  return {
    user,
    mutateRegister,
    mutateLogin,
    setUser,
    isPending,
    handleSendEmail,
    handleForgotPassword,
  };
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
