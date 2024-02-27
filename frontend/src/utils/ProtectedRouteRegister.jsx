// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRouteRegister({ children, allowedRoles }) {
  const token = localStorage.getItem("userToken");
  return token ? <Navigate to="/" /> : children;
}

export default ProtectedRouteRegister;
