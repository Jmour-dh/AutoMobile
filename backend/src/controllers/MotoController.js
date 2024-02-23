const models = require("../models");

const createMoto = (req, res) => {
  const moto = req.body;
  models.moto
    .insertMoto(moto)
    .then(([result]) => {
      res.location(`/motos/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getMotoByID = (req, res) => {
  models.moto
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

const getAllMotos = (req, res) => {
  models.moto
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateMoto = (req, res) => {
  const moto = req.body;
  const motoID = req.Moto_ID;
  moto.id = parseInt(req.params.id, 10);

  models.moto
    .update(moto, motoID)
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

const deleteMoto = (req, res) => {
  const motoID = req.params.id;

  models.moto
    .deleteMoto(motoID)
    .then((result) => {
      if (result.affectedRows > 0) {
        console.info(
          `La moto avec l'ID ${motoID} a été supprimée avec succès.`
        );
      }

      // Toujours renvoyer le statut 204, que la moto ait été supprimée ou non
      res.sendStatus(204);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  createMoto,
  getMotoByID,
  updateMoto,
  getAllMotos,
  deleteMoto,
};
