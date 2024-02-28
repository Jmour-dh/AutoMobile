const models = require("../models");

const createContact = (req, res) => {
  const contact = req.body;
  models.contact
    .insertContact(contact)
    .then(([result]) => {
      res.location(`/contacts/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getContactByID = (req, res) => {
  models.contact
    .findByPK(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAllContacts = (req, res) => {
  models.contact
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateContact = (req, res) => {
  const contact = req.body;
  const contactID = req.Contact_ID;
  contact.id = parseInt(req.params.id, 10);

  models.contact
    .update(contact, contactID)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const deleteContact = (req, res) => {
  const contactID = req.params.id;

  models.contact
    .deleteContact(contactID)
    .then((result) => {
      if (result.affectedRows > 0) {
        console.info(
          `Le contact' avec l'ID ${contactID} a été supprimée avec succès.`
        );
      }
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  createContact,
  getContactByID,
  getAllContacts,
  updateContact,
  deleteContact,
};
