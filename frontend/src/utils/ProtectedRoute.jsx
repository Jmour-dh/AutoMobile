// Importation des modules nécessaires depuis React et react-router-dom
import React from "react";
import { Navigate } from "react-router-dom";

// Composant de route protégée
function ProtectedRoute({ children, allowedRoles }) {
  // Récupération du token utilisateur depuis le stockage local
  const token = localStorage.getItem("userToken");
  // Récupération du rôle utilisateur depuis le stockage local
  const roleId = localStorage.getItem("roleId");

  // Affichage du rôle utilisateur dans la console à des fins de débogage
  console.log("roleId", roleId);
  console.log("allowedRoles", allowedRoles);

  // Vérifie si l'utilisateur a un token
  if (!token) {
    // Si l'utilisateur n'a pas de token, redirige vers la page de connexion
    return <Navigate to="/login" />;
  } else if (allowedRoles && !allowedRoles.includes(parseInt(roleId))) {
    // Vérifie si l'utilisateur a les rôles autorisés pour accéder à la route
    // Si l'utilisateur a un token mais n'a pas le rôle nécessaire, redirige vers la page d'accueil
    return <Navigate to="/" />;
  } else {
    // Si l'utilisateur a un token et les rôles autorisés, permet d'accéder à la route
    return children;
  }
}

// Exportation du composant ProtectedRoute
export default ProtectedRoute;
