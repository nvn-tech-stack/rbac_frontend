import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";

import { adminRoutes, publicRoutes } from "./routes";

import { useAuth } from "../hooks/auth";
import { clearToken, getAccessToken } from "../utils/localStorage";
import ContextContainer from "../context";

const RequireAuth = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { user } = useAuth();
  const token = getAccessToken();

  if (!user || !token) {
    clearToken();
    return <Navigate to="/auth" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(user?.role?.type)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export const PublicRoute = () => {
  const { user } = useAuth();
  const token = getAccessToken();
  if (user && token) {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
};

const AppRouter = createBrowserRouter([
  {
    element: <ContextContainer />,
    children: [
      // public routes
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/",
            element: <Navigate to="/auth" replace />,
          },
          ...publicRoutes.map((route) => ({
            path: route.path,
            element: route.element,
          })),
        ],
      },

      // admin routes
      {
        element: <RequireAuth allowedRoles={["admin"]} />,
        children: [
          {
            path: "admin",
            element: <RootLayout />,
            children: [
              ...adminRoutes.map((route) => ({
                path: route.path,
                element: route.element,
              })),
            ],
          },
        ],
      },
      { path: "unauthorized", element: <h1>unauthorized</h1> },
      { path: "*", element: <h1>Page Not found</h1> },
    ],
  },
]);

export default AppRouter;
