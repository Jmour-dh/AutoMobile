import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BanniereContact.module.scss";
import axios from "axios";
import { hostname } from "../../hostname/hostname";
import { useAuth } from "../../utils/UseConnecte";

function BanniereContact() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const roleId = localStorage.getItem("roleId");

  const [formData, setFormData] = useState({
    FirstNameVisiter: "",
    LastNameVisiter: "",
    EmailVisiter: "",
    Objet: "",
    Message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulez la récupération de l'utilisateur connecté depuis le stockage local
      const userId = localStorage.getItem("userId");

      // Créez un objet data avec les données du formulaire
      const data = {
        ...formData,
        User_ID: userId,
      };

      // Si userId n'est pas nul, définissez les champs à null
      if (userId !== null) {
        data.FirstNameVisiter = null;
        data.LastNameVisiter = null;
        data.EmailVisiter = null;
      }

      // Continuez avec la soumission du formulaire
      const response = await axios.post(`${hostname}/contacts`, data);
      console.log("Réponse du serveur:", response.data);

      // Réinitialisez l'état du formulaire après la soumission réussie
      setFormData({
        FirstNameVisiter: "",
        LastNameVisiter: "",
        EmailVisiter: "",
        Objet: "",
        Message: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Erreur côté frontend:", error);
      // Gérez les erreurs ici si nécessaire
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contacter}>
        {(isLoggedIn && roleId === "2") || !isLoggedIn ? (
          <>
            <h2>Contactez-nous</h2>
            <form onSubmit={handleSubmit}>
              {isLoggedIn ? (
                <></>
              ) : (
                <>
                  <div className="d-flex flex-column mx-10">
                    <label htmlFor="FirstNameVisiter"> Nom:</label>
                    <input
                      type="text"
                      name="FirstNameVisiter"
                      value={formData.FirstNameVisiter}
                      onChange={handleChange}
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ -']+"
                      required
                    />
                  </div>
                  <div className="d-flex flex-column mx-10">
                    <label htmlFor="LastNameVisiter"> Prénom:</label>
                    <input
                      type="text"
                      name="LastNameVisiter"
                      value={formData.LastNameVisiter}
                      onChange={handleChange}
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ -']+"
                      required
                    />
                  </div>
                  <div className="d-flex flex-column mx-10">
                    <label htmlFor="LastNameVisiter"> Email:</label>
                    <input
                      type="email"
                      name="EmailVisiter"
                      value={formData.Email}
                      onChange={handleChange}
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      required
                    />
                  </div>
                </>
              )}
              <div className="d-flex flex-column mx-10">
                <label htmlFor="Objet"> Objet:</label>
                <input
                  type="text"
                  name="Objet"
                  value={formData.Objet}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-flex flex-column mx-10">
                <label htmlFor="Message"> Message:</label>
                <textarea
                  type="text"
                  name="Message"
                  value={formData.Message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="m-5" type="submit">
                Envoyer
              </button>
            </form>
          </>
        ) : (
          <p style={{ color: "red", textDecoration: "underline" }}>
            Accès utilisateur
          </p>
        )}
      </div>
      <div className={styles.hours}>
        <h3>Horaire d'ouverture</h3>
        <p>Lun: 08:45 - 12:00, 14:00 - 18:00 </p>
        <p>Mar: 08:45 - 12:00, 14:00 - 18:00 </p>
        <p>Mer: 08:45 - 12:00, 14:00 - 18:00 </p>
        <p>Jeu: 08:45 - 12:00, 14:00 - 18:00 </p>
        <p>Vend: 08:45 - 12:00, 14:00 - 18:00 </p>
        <p>Sam: 08:45 - 12:00, 14:00 - 18:00 </p>
        <p>Dim: Fermé </p>
        <h3>Notre adresse</h3>
        <p>AutoMobile, 32 Rue de Nantes, Lyon </p>
      </div>
    </div>
  );
}

export default BanniereContact;
