import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contextApi/AuthProvider";

export default function ProtectedRoute() {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  return auth?.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={`/login`} state={{ from: location }} />
  );
}
