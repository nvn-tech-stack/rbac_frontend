import { AuthContextProvider } from "../hooks/auth";
import { ToastProvider } from "../hooks/Toast";
import { NotificationProvider } from "../hooks/notification";
import { Outlet } from "react-router-dom";

export default function ContextContainer() {
  return (
    <>
      <ToastProvider>
        <AuthContextProvider>
          <NotificationProvider>
            <Outlet />
          </NotificationProvider>
        </AuthContextProvider>
      </ToastProvider>
    </>
  );
}
