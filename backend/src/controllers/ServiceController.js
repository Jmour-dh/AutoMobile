const models = require("../models");

const createService = (req, res) => {
  const service = req.body;
  if (req.file) {
    service.ImageUrl = req.file.filename;
  }

  models.service
    .insertService(service)
    .then(([result]) => {
      res.location(`/services/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getServiceByID = (req, res) => {
  models.service
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

const getAllServices = (req, res) => {
  models.service
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateService = (req, res) => {
  const service = req.body;
  if (req.file) {
    service.ImageUrl = req.file.filename;
  }
  const serviceID = req.Service_ID;
  service.id = parseInt(req.params.id, 10);

  models.service
    .update(service, serviceID)
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

const deleteService = (req, res) => {
  const serviceID = req.params.id;

  models.service
    .deleteService(serviceID)
    .then((result) => {
      if (result.affectedRows > 0) {
        console.info(
          `Le service avec l'ID ${serviceID} a été supprimée avec succès.`
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
  createService,
  getServiceByID,
  getAllServices,
  updateService,
  deleteService,
};
