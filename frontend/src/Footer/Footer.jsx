import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { GrAndroid } from "react-icons/gr";
import { BsApple } from "react-icons/bs";
import { images } from "../constants";
import styles from "./Footer.module.scss";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  const sections = [
    {
      title: "L'ENTREPRISE",
      links: [
        { label: "Qui sommes-nous?", to: "/about" },
        { label: "Politique de confidentialite", to: "#" },
        { label: "Mentions légale", to: "#" },
      ],
    },

    {
      title: "SERVICES PRO",
      links: [
        { label: "Accès client", to: "/login" },
        { label: "Les annonces sur AutoMobile", to: "/occasion" },
      ],
    },

    {
      title: "NOS APPLICATIONS",
      links: [
        { label: "Découvrez nos applications", to: "#" },
        { label: <BsApple />, to: "/" },
        { label: <GrAndroid />, to: "/" },
      ],
    },
  ];

  const socialIcons = [
    <FaFacebookF key="facebook" />,
    <FaTwitter key="twitter" />,
    <FaLinkedin key="linkedin" />,
    <FaYoutube key="youtube" />,
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <div className={styles.logo}>
          <span>A propos de l'AutoMobile</span>
          <Link to="/">
            <img src={images.Logo} alt="logo" />
          </Link>
        </div>
        <div className={styles.social}>
          <span>Retrouvez-nous sur ...</span>
          <div>{socialIcons}</div>
        </div>
      </div>
      <div className={styles.contents}>
        {sections.map((section, index) => (
          <div key={index} className={styles.dev1}>
            <span>{section.title}</span>
            {section.links.map((link, linkIndex) => (
              <div key={linkIndex}>
                <Link to={link.to}>{link.label}</Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={styles.footerBas}>
        <span>Copyright © {year} AutoMobile - Tous droits réservés </span>
      </div>
    </footer>
  );
}

export default Footer;
