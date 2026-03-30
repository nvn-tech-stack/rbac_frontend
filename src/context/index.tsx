import { AuthContextProvider } from "../hooks/auth";
import { ToastProvider } from "../hooks/Toast";
import { Outlet } from "react-router-dom";

export default function ContextContainer() {
  return (
    <>
      <ToastProvider>
        <AuthContextProvider>
          <Outlet />
        </AuthContextProvider>
      </ToastProvider>
    </>
  );
}
