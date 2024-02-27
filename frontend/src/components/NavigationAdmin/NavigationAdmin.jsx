import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // Importez Axios
import styles from "./NavigationAdmin.module.scss";
import { useAuth } from "../../utils/UseConnecte";
import { hostname } from "../../hostname/hostname";

function NavigationAdmin() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.get(`${hostname}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Appel réussi, maintenant déconnectez localement l'utilisateur
      logout();
      navigate("/");
    } catch (error) {
      // Gérer les erreurs ici
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <ul className={styles.list}>
      <li>
        <NavLink to="messages/list">Messages</NavLink>
      </li>
      <li>
        <NavLink to="avis/list">Avis</NavLink>
      </li>
      <li>
        <NavLink to="contacts/list">Contacts</NavLink>
      </li>
      <li>
        <NavLink to="personals">Personnels</NavLink>
      </li>
      <li>
        <NavLink to="users">Utilisateurs</NavLink>
      </li>
      <li>
        <NavLink to="motos">Motos</NavLink>
      </li>
      <li>
        <NavLink to="services">Services</NavLink>
      </li>
      <li>
        <NavLink to="#" onClick={handleLogout}>
          Déconnexion
        </NavLink>
      </li>
    </ul>
  );
}

export default NavigationAdmin;
