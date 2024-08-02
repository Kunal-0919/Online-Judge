import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const ProtectedRoute = ({ component: Component, redirectPath = "/login" }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === undefined) {
    return <Loading />;
  }

  return isAuthenticated ? <Component /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
