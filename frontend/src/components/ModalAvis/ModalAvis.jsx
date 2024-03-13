import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { hostname } from "../../hostname/hostname";
import { useAuth } from "../../utils/UseConnecte";

function ModalAvis({ showModal, handleModalClose, serviceId,handleClose }) {
  const { isLoggedIn } = useAuth();

  // Utilisez useState pour gérer l'état du formulaire
  const [formData, setFormData] = useState({
    FirstNameVisiter: "",
    LastNameVisiter: "",
    EmailVisiter: "",
    Comment: "",
    Note: 0,
  });

  // Définissez la fonction handleChange pour mettre à jour l'état du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Définissez la fonction handleStarClick pour mettre à jour la note dans l'état du formulaire
  const handleStarClick = (Note) => {
    setFormData({
      ...formData,
      Note: Note,
    });
  };

  
 // Définissez la fonction handleSubmit pour soumettre les données du formulaire
const handleSubmit = async (e) => {
  e.preventDefault();

  // Vérifiez si la note est égale à zéro
  if (formData.Note === 0) {
    console.error("La note est obligatoire");
    // Affichez un message d'erreur ou effectuez toute autre action nécessaire
    return;
  }

  console.log("Formulaire soumis avec les données :", formData);

  try {
    // Simulez la récupération de l'utilisateur connecté depuis le stockage local
    const userId = localStorage.getItem("userId");

    // Créez un objet data avec les données du formulaire
    const data = {
      ...formData,
      User_ID: userId,
      Service_ID: serviceId,
    };

     // Si userId n'est pas nul, définissez les champs à null
     if (userId !== null) {
      data.FirstNameVisiter = null;
      data.LastNameVisiter = null;
      data.EmailVisiter = null;
    }

    // Continuez avec la soumission du formulaire
    const response = await axios.post(`${hostname}/avis`, data);
    console.log("Réponse du serveur:", response.data);

    // Réinitialisez l'état du formulaire après la soumission réussie
    setFormData({
      FirstNameVisiter: "",
      LastNameVisiter: "",
      EmailVisiter: "",
      Comment: "",
      Note: 0,
    });

    // Fermez la modal
    handleModalClose();
    handleClose();
  } catch (error) {
    console.error("Erreur côté frontend:", error);
    // Gérez les erreurs ici si nécessaire
  }
};


  return (
    <Modal show={showModal} onHide={handleModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un avis</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formNote">
            <Form.Label>Note</Form.Label>
            <div>
              {[1, 2, 3, 4, 5].map((Note) => (
                <BsStarFill
                  key={Note}
                  color={Note <= formData.Note ? "#f39c12" : "#ccc"}
                  style={{ cursor: "pointer" }}
                  name="Note"
                  onClick={() => handleStarClick(Note)}
                />
              ))}
            </div>
          </Form.Group>
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

          <Form.Group controlId="formCommentaire">
            <Form.Label>Commentaire</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Votre commentaire"
              name="Comment"
              value={formData.Comment}
              onChange={handleChange}
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
              Enregistrer l'avis
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAvis;
