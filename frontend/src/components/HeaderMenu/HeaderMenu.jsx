import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import styles from "./HeaderMenu.module.scss";

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
            <li>
              <NavLink to="/occasion">OCCASIONS</NavLink>
            </li>
            <li>
              <NavLink to="/service">SERVICES</NavLink>
            </li>
            <li>
              <NavLink to="/about">À PROPOS DE NOUS</NavLink>
            </li>
            <li>
              <NavLink to="/login">MON ESPACE</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default HeaderMenu;
