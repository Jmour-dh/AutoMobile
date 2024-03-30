import React, {
  useState,        
  useEffect,       
  useContext,      
  createContext,   
  useMemo,         
} from "react";
import PropTypes from "prop-types";

// Création d'un contexte pour gérer l'authentification
const AuthContext = createContext(null);

// Custom hook pour accéder au contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};

// Composant fournisseur d'authentification
export function AuthProvider({ children }) {
  // Déclaration de l'état local pour le statut de connexion
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Effet de bord pour vérifier si un token utilisateur est présent dans le stockage local
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);  // Met à jour l'état isLoggedIn en fonction de la présence du token
  }, []);

  // Fonction de connexion utilisateur
  const login = (token, userId) => {
    localStorage.setItem("userToken", token);  // Stocke le token utilisateur dans le stockage local
    localStorage.setItem("userId", userId);    // Stocke l'ID de l'utilisateur dans le stockage local
    setIsLoggedIn(true);                        // Met à jour l'état isLoggedIn à true
  };

  // Fonction de déconnexion utilisateur
  const logout = () => {
    localStorage.clear();   // Efface toutes les données du stockage local
    setIsLoggedIn(false);   // Met à jour l'état isLoggedIn à false
  };

  // Crée une valeur de contexte memoisée pour éviter les rendus inutiles
  const value = useMemo(() => ({ isLoggedIn, login, logout }), [isLoggedIn]);

  // Rendu du fournisseur d'authentification avec le contexte de valeur fourni aux enfants
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Spécification des types de props attendus pour le composant AuthProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
