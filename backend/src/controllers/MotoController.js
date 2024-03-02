const models = require("../models");

const createMoto = async (req, res) => {
  const moto = req.body;

  try {
    const motoId = await models.moto.insertMoto(moto);

    // Vérifie si des fichiers ont été téléchargés et les insère
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((file) => file.filename);
      await models.moto.insertMotoImages(motoId, imageUrls);
    }

    res.location(`/motos/${motoId}`).sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
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
  if (req.file) {
    moto.ImageUrl = req.file.filename;
  }
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
