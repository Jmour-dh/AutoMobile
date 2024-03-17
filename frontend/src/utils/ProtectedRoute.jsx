// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("userToken");
  const roleId = localStorage.getItem("roleId");
  console.log("roleId", roleId);
  console.log("allowedRoles",allowedRoles);

  if (!token) {
    // Si l'utilisateur n'a pas de token, redirige vers la page de connexion
    return <Navigate to="/login" />;
  } else if (allowedRoles && !allowedRoles.includes(parseInt(roleId))) {
    // Si l'utilisateur a un token mais n'a pas le rôle nécessaire, redirige vers la page d'accueil
    return <Navigate to="/" />;
  }else {
    // Sinon, permet d'accéder à la route
    return children;
  }
}

export default ProtectedRoute;
