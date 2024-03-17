import React from "react";
import styles from "./ProfileNav.module.scss";
import { NavLink } from "react-router-dom";

function ProfileNav() {
  const navItems = [
    { to: "tabBord", label: "Tableau de bord" },
    { to: "profile", label: "Profil" },
  ];
  return (
    
    <ul className={styles.list}>
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink
            className={({ isActive }) => (isActive ? "Linkactive1" : "")}
            to={item.to}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default ProfileNav