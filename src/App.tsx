import "./App.css";

import { Navigate, Outlet } from "react-router-dom";
import ContextContainer from "./context";
import { checkTokenExpire } from "./services/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { clearToken, getAccessToken } from "./utils/localStorage";

export default function App() {
  const queryClient = useQueryClient();
  const token = getAccessToken();

  const { isError: isNotValid } = useQuery({
    queryKey: ["verify-token", token],
    queryFn: checkTokenExpire,
    enabled: !!token,
  });
  
  if (!navigator?.onLine) {
    return <h1>No internet</h1>;
  }

  if (isNotValid) {
    clearToken();
    queryClient.clear();
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <ContextContainer>
        <Outlet />
      </ContextContainer>
    </>
  );
}
