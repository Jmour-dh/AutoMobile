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
const createPersonal = (req, res) => {
  const user = req.body;
  models.user
    .insertPersonal(user)
    .then(([result]) => {
      res.location(`/users/createPersonal/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserByID = (req, res) => {
  models.user
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

const getAllUsers = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUser = (req, res) => {
  const user = req.body;
  const userID = req.User_ID;
  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user, userID)
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

const deleteUser = async (req, res, next) => {
  const emailInput = req.body.Email;

  const [user] = await models.user.findByPK(req.params.id);
  const userEmail = user[0].Email;

  if (emailInput === userEmail) {
    next();
  } else {
    res.sendStatus(403);
  }

  models.user
    .delete(emailInput)
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

const login = async (req, res, next) => {
  const Email = req.body;
  await models.user
    .login(Email)
    .then(([result]) => {
      if (result.length === 0) {
        // User not found
        res.status(401).json({ emailNotFound: true });
      } else {
        const user = result[0];
        // Pass the entire user object to auth.js for password verification
        req.user = user;
        next(); // Proceed to password verification in the auth middleware
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.replace(/^Bearer\s+/, "");
    models.experiedToken.insert(token).then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Error logging out" });
  }
};
// Modifier le contrôleur pour appeler la nouvelle fonction
const verifyExistingEmail = async (req, res) => {
  try {
    const emailExists = await models.user.verifyExistingEmail(req.body.email);
    res.status(200).json({ conflict: emailExists });
  } catch (err) {
    console.error(
      "Erreur lors de la vérification de l'utilisateur existant :",
      err
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyExistingPhone = async (req, res) => {
  try {
    const phoneExists = await models.user.verifyExistingPhone(req.body.phone);
    res.status(200).json({ conflict: phoneExists });
  } catch (err) {
    console.error(
      "Erreur lors de la vérification de l'utilisateur existant :",
      err
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  createPersonal,
  getUserByID,
  getAllUsers,
  updateUser,
  deleteUser,
  login,
  logout,
  verifyExistingEmail,
  verifyExistingPhone,
};
