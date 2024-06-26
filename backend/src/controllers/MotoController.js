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

const getMotoByID = async (req, res) => {
  try {
    const [motoRows] = await models.moto.findByPK(req.params.id);

    if (motoRows[0] == null) {
      res.sendStatus(404);
      return;
    }

    const moto = motoRows[0];

    // Utilise la nouvelle fonction findImagesByPK pour récupérer les images de la moto
    const images = await models.moto.findImagesByPK(req.params.id);

    // Ajoute le tableau d'images à l'objet moto
    moto.images = images;

    res.send(moto);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getAllMotos = (req, res) => {
  models.moto
    .findAllWithImages()
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateMoto = async (req, res) => {
  const moto = req.body;
  const motoID = req.params.id;

  try {
    // Si de nouveaux fichiers ont été téléchargés, met à jour les images
    if (req.files && req.files.length > 0) {
      const imageUrls = req.files.map((file) => file.filename);
      await models.moto.updateMotoImages(motoID, imageUrls);
    }

    // Met à jour les autres détails de la moto
    await models.moto.update(moto, motoID);

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
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

const getAllMotosByCriteria = async (req, res) => {
  const criteria = req.query; // Récupère les critères de filtre de la requête

  try {
    // Récupère toutes les motos avec leurs images
    const motos = await models.moto.findAllWithImages();

    // Filtrer les motos en fonction des critères
    const filteredMotos = motos.filter((moto) => {
      // Vérifie si chaque critère spécifié dans la requête correspond à la moto
      return (
        (!criteria.Marque || moto.Marque === criteria.Marque) &&
        (!criteria.Year || moto.Year === +criteria.Year) &&
        (!criteria.OdometerMileage ||
          moto.OdometerMileage <= criteria.OdometerMileage)
      );
    });

    // Envoie les données des motos filtrées en réponse
    res.send(filteredMotos);
  } catch (err) {
    // En cas d'erreur, affiche l'erreur dans la console et envoie un code d'état 500 (erreur serveur) en réponse
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  createMoto,
  getMotoByID,
  updateMoto,
  getAllMotos,
  deleteMoto,
  getAllMotosByCriteria,
};
