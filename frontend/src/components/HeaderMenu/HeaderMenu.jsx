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
                <NavLink
                  onClick={closeMenu}
                  to={to}
                  className={({ isActive }) => (isActive ? "Linkactive" : "")}
                >
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default HeaderMenu;
