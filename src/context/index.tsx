import { AuthContextProvider } from "../hooks/auth";
import { ToastProvider } from "../hooks/Toast";
import { NotificationProvider } from "../hooks/notification";

import { UserManagementProvider } from "../hooks/user-management";
import type { ReactNode } from "react";

type props = {
  children: ReactNode;
};

export default function ContextContainer({ children }: props) {
  return (
    <>
      <ToastProvider>
        <AuthContextProvider>
          <NotificationProvider>
            <UserManagementProvider>{children}</UserManagementProvider>
          </NotificationProvider>
        </AuthContextProvider>
      </ToastProvider>
    </>
  );
}
