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
  const token = localStorage.getItem("userToken");
  const roleId = localStorage.getItem("roleId");

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
        <nav className={`${styles.menu} justify-content-around `}>
          <ul className={styles.list}>
            {navLinks.map(({ to, text }) => (
              <li key={to}>
                {to === "/login" && token ? (
                  // Si l'utilisateur est connecté, redirige vers le profil en fonction du roleId
                  <NavLink to={roleId === "1" ? "/admin/messages/list" : roleId === "2" ? "/user/details/tabBord" : "/personal/messages/list"} className={({ isActive }) => (isActive ? "Linkactive" : "")}>
                    {text}
                  </NavLink>
                ) : (
                  // Sinon, utilise le NavLink normal
                  <NavLink to={to} className={({ isActive }) => (isActive ? "Linkactive" : "")}>
                    {text}
                  </NavLink>
                )}
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
