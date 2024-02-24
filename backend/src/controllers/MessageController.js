const models = require("../models");

const createMessage = (req, res) => {
  const message = req.body;
  models.message
    .insertMessage(message)
    .then(([result]) => {
      res.location(`/messages/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getMessageByID = (req, res) => {
  models.message
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

const getAllMessages = (req, res) => {
  models.message
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateMessage = (req, res) => {
  const message = req.body;
  const messageID = req.Message_ID;
  message.id = parseInt(req.params.id, 10);

  models.message
    .update(message, messageID)
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

const deleteMessage = (req, res) => {
  const messageID = req.params.id;

  models.message
    .deleteMessage(messageID)
    .then((result) => {
      if (result.affectedRows > 0) {
        console.info(
          `Le message avec l'ID ${messageID} a été supprimée avec succès.`
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
  createMessage,
  getMessageByID,
  getAllMessages,
  updateMessage,
  deleteMessage,
};
