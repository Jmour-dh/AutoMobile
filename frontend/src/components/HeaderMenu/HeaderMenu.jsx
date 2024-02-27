import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import styles from "./HeaderMenu.module.scss";

const navLinks = [
  { to: "/occasion", text: "OCCASIONS" },
  { to: "/service", text: "SERVICES" },
  { to: "/about", text: "À PROPOS DE NOUS" },
  { to: "/login", text: "MON ESPACE" },
];

function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("userToken");
  const roleId = localStorage.getItem("roleId");

  const closeMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className={`${styles.menuContainer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.icon}>
        <IoMdClose className={styles.close} size={28} onClick={closeMenu} />
      </div>
      <div>
        <nav className={styles.nav}>
          <ul>
            {navLinks.map(({ to, text }) => (
              <li key={to}>
                {to === "/login" && token ? (
                  // Si l'utilisateur est connecté, redirige vers le profil en fonction du roleId
                  <NavLink
                    onClick={closeMenu}
                    to={roleId === "1" ? "/admin" : roleId === "2" ? "/user" : "/personal"}
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                  >
                    {text}
                  </NavLink>
                ) : (
                  // Sinon, utilise le NavLink normal
                  <NavLink
                    onClick={closeMenu}
                    to={to}
                    className={({ isActive }) => (isActive ? "Linkactive" : "")}
                  >
                    {text}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default HeaderMenu;
