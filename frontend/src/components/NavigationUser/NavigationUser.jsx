import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./NavigationUser.module.scss";
import { useAuth } from "../../utils/UseConnecte";
import { hostname } from "../../hostname/hostname";

function NavigationUser() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { to: "details/tabBord", text: "Détails compte" },

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
        navigate("/");
      } else {
        await axios.get(`${hostname}/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        logout();
        navigate("/login");
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
  )
}

export default NavigationUser