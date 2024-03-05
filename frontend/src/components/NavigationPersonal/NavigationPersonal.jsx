import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./NavigationPersonal.module.scss";
import { useAuth } from "../../utils/UseConnecte";
import { hostname } from "../../hostname/hostname";

function NavigationPersonal() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { to: "messages/list", text: "Messages" },
    { to: "avis/list", text: "Avis" },
    { to: "contacts/list", text: "Contacts" },
    { to: "users", text: "Utilisateurs" },
    { to: "motos", text: "Motos" },
    { to: "services", text: "Services" },
  ];

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const tokenExpiryTime = localStorage.getItem("tokenExpiryTime");
      const currentTime = new Date().getTime();

      if (currentTime > tokenExpiryTime) {
        // Le token a expiré
        console.log("Token expiré. Déconnexion...");
        logout();
        navigate("/login");
      } else {
        await axios.get(`${hostname}/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        logout();
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <ul className={styles.list}>
      {navLinks.map((link, index) => (
        <li key={index}>
          <NavLink to={link.to}>{link.text}</NavLink>
        </li>
      ))}
      <li>
        <NavLink to="#" onClick={handleLogout}>
          Déconnexion
        </NavLink>
      </li>
    </ul>
  );
}

export default NavigationPersonal