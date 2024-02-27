import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./MotoNav.module.scss";

const navItems = [
  { to: "list", label: "Liste des motos" },
  { to: "new", label: "Ajouter un moto" },
];

function MotoNav() {
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

export default MotoNav;
