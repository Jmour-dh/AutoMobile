import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { hostname } from "../../hostname/hostname";
import { useAuth } from "../../utils/UseConnecte";

function ModalMessage({ showModal, handleModalClose, motoId }) {
  const { isLoggedIn } = useAuth();

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
    console.log("Formulaire soumis avec les données :", formData);

    try {
      // Simulez la récupération de l'utilisateur connecté depuis le stockage local
      const userId = localStorage.getItem("userId");

      // Créez un objet data avec les données du formulaire
      const data = {
        ...formData,
        User_ID: userId,
        Moto_ID: motoId,
      };

      // Si userId n'est pas nul, définissez les champs à null
      if (userId !== null) {
        data.FirstNameVisiter = null;
        data.LastNameVisiter = null;
        data.EmailVisiter = null;
      }

      // Continuez avec la soumission du formulaire
      const response = await axios.post(`${hostname}/messages`, data);
      console.log("Réponse du serveur:", response.data);

      // Réinitialisez l'état du formulaire après la soumission réussie
      setFormData({
        FirstNameVisiter: "",
        LastNameVisiter: "",
        EmailVisiter: "",
        Objet: "",
        Message: "",
      });

      // Fermez la modal
      handleModalClose();
    } catch (error) {
      console.error("Erreur côté frontend:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Envoyer un message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {isLoggedIn ? (
            <></>
          ) : (
            <>
              <Form.Group controlId="formNom">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Votre nom"
                  name="FirstNameVisiter"
                  value={formData.FirstNameVisiter}
                  onChange={handleChange}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ -']+"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPrenom">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Votre prénom"
                  name="LastNameVisiter"
                  value={formData.LastNameVisiter}
                  onChange={handleChange}
                  pattern="[A-Za-zÀ-ÖØ-öø-ÿ -']+"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Votre email"
                  name="EmailVisiter"
                  value={formData.Email}
                  onChange={handleChange}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                />
              </Form.Group>
            </>
          )}
          <Form.Group controlId="formObjet">
            <Form.Label>Objet</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre Objet"
              name="Objet"
              value={formData.Objet}
              onChange={handleChange}
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ -']+"
              required
            />
          </Form.Group>
          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Votre Message"
              name="Message"
              value={formData.Comment}
              onChange={handleChange}
              pattern="[A-Za-zÀ-ÖØ-öø-ÿ -']+"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between m-2">
            <Button
              variant="secondary"
              onClick={handleModalClose}
              className="mr-2"
            >
              Fermer
            </Button>
            <Button variant="primary" type="submit">
              Envoyer
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalMessage;
