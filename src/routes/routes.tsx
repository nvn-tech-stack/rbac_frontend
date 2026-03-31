import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Dashboard from "../pages/Admin/Dashboard";
import Login from "../pages/Login";
import { useEffect } from "react";
import { baseURL } from "../services/api";
import { setLsUser } from "../utils/localStorage";

import { useAuth } from "../hooks/auth";
import { getUserByToken } from "../services/user";
import { useQuery } from "@tanstack/react-query";

const OauthRedirect = () => {
  const { provider, user } = useParams();
  useEffect(() => {
    if (provider) {
      window.location.href = `${baseURL}/auth/${provider}/${user}`;
    }
  }, [provider, user]);

  return <p>Loading...</p>;
};

const OauthSuccess = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    }
  }, [token]);
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user-by-token"],
    queryFn: () => getUserByToken(),
    enabled: !!token,
  });
  useEffect(() => {
    if (user) {
      setUser(user?.results);
      setLsUser(user?.results);

      navigate("/admin", { replace: true });
    }
  }, [user, navigate, setUser]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Login failed. Please try again.</div>;

  return null;
};

export const adminRoutes = [
  {
    id: 1,
    name: "admin",
    path: "",
    element: <Dashboard />,
  },
  {
    id: 2,
    name: "dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },

  {
    id: 3,
    name: "user-management",
    path: "user-management",
    element: <h1>management</h1>,
  },
];

export const publicRoutes = [
  {
    id: 1,
    name: "auth",
    path: "auth",
    element: <Login />,
  },

  {
    id: 2,
    name: "oauth-redirect",
    path: "/oauth/:provider/:user",
    element: <OauthRedirect />,
  },
  {
    id: 3,
    name: "oauth-success",
    path: "oauth-success",
    element: <OauthSuccess />,
  },
];
