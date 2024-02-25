import React, { useState } from "react";
import styles from "./Header.module.scss";
import { NavLink, Link } from "react-router-dom";
import { images } from "../constants";
import { AiOutlineMenu } from "react-icons/ai";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";

const navLinks = [
  { to: "/occasion", text: "OCCASIONS" },
  { to: "/service", text: "SERVICES" },
  { to: "/about", text: "À PROPOS DE NOUS" },
  { to: "/login", text: "MON ESPACE" },
];

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  // Fonction pour basculer la visibilité du menu
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header className={`${styles.header} d-flex justify-content-around align-items-center`}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={images.Logo} alt="Logo" />
          </Link>
        </div>
        <nav className={`${styles.menu} d-flex justify-content-around `}>
          <ul className={styles.list}>
            {navLinks.map(({ to, text }) => (
              <li key={to}>
                <NavLink to={to} className={({ isActive }) => (isActive ? "Linkactive" : "")}>
                  {text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <AiOutlineMenu className={styles.headerResp} onClick={toggleMenu} />
      </header>
      {showMenu && <HeaderMenu />}
    </>
  );
}

export default Header;
