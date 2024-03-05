// ModalAvis.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

function ModalAvis({ showModal, handleModalClose }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    commentaire: "",
    note: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStarClick = (note) => {
    setFormData({
      ...formData,
      note: note,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis avec les données :", formData);
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      commentaire: "",
      note: 0,
    });
    handleModalClose();
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
              {[1, 2, 3, 4, 5].map((note) => (
                <BsStarFill
                  key={note}
                  color={note <= formData.note ? "#f39c12" : "#ccc"}
                  style={{ cursor: "pointer" }}
                  onClick={() => handleStarClick(note)}
                />
              ))}
            </div>
          </Form.Group>
          <Form.Group controlId="formNom">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrenom">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Votre prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Votre email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCommentaire">
            <Form.Label>Commentaire</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Votre commentaire"
              name="commentaire"
              value={formData.commentaire}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-between m-2">
            <Button variant="secondary" onClick={handleModalClose} className="mr-2">
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
