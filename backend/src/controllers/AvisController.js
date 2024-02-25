const models = require("../models");

const createAvis = (req, res) => {
  const avis = req.body;
  models.avis
    .insertAvis(avis)
    .then(([result]) => {
      res.location(`/avis/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getAvisByID = (req, res) => {
  models.avis
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

const getAllAvis = (req, res) => {
  models.avis
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateAvis = (req, res) => {
  const avis = req.body;
  const avisID = req.Avis_ID;
  avis.id = parseInt(req.params.id, 10);

  models.avis
    .update(avis, avisID)
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

const deleteAvis = (req, res) => {
  const avisID = req.params.id;

  models.avis
    .deleteAvis(avisID)
    .then((result) => {
      if (result.affectedRows > 0) {
        console.info(
          `L'avis' avec l'ID ${avisID} a été supprimée avec succès.`
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
  createAvis,
  getAvisByID,
  getAllAvis,
  updateAvis,
  deleteAvis,
};
