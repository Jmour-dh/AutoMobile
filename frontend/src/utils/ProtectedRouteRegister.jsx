// Importation des modules nécessaires depuis React et react-router-dom
import React from "react";
import { Navigate } from "react-router-dom";

// Composant de route protégée pour l'inscription
function ProtectedRouteRegister({ children, allowedRoles }) {
  // Récupération du token utilisateur depuis le stockage local
  const token = localStorage.getItem("userToken");
  
  // Vérifie si un token est présent, si oui, redirige vers la page d'accueil, sinon, rend le contenu enfant
  return token ? <Navigate to="/" /> : children;
}

// Exportation du composant ProtectedRouteRegister
export default ProtectedRouteRegister;
