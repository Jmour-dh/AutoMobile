import React from "react";
import styles from "./UserNav.module.scss";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "list", label: "Liste des utilisateurs" },
  { to: "new", label: "Ajouter un utilisateur" },
];

function UserNav() {
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
  );
}

export default UserNav;
