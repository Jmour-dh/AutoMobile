import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AvisNav.module.scss";

const navItems = [{ to: "list", label: "Liste des avis" }];
function AvisNav() {
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

export default AvisNav;
