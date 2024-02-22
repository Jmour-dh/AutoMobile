const models = require("../models");

const createUser = (req, res) => {
  const user = req.body;
  models.user
    .insertUser(user)
    .then(([result]) => {
      res.location(`/users/createUser/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  createUser,
};
