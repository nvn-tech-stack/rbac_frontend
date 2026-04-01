import { AuthContextProvider } from "../hooks/auth";
import { ToastProvider } from "../hooks/Toast";
import { NotificationProvider } from "../hooks/notification";
import { Outlet } from "react-router-dom";
import { UserManagementProvider } from "../hooks/user-management";

export default function ContextContainer() {
  return (
    <>
      <ToastProvider>
        <AuthContextProvider>
          <NotificationProvider>
            <UserManagementProvider>
              <Outlet />
            </UserManagementProvider>
          </NotificationProvider>
        </AuthContextProvider>
      </ToastProvider>
    </>
  );
}
