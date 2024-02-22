const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  // Vérifiez si le champ Password est présent dans la requête
  if (!req.body.Password) {
    return res.status(400).json({
      success: false,
      message: "Le champ Password est requis.",
    });
  }

  // Hachez le mot de passe en utilisant argon2, puis appelez next()
  try {
    const hash = await argon2.hash(req.body.Password, hashingOptions);
    req.body.HashedPassword = hash;
    delete req.body.Password;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  return null;
};
const verifyPassword = async (req, res) => {
  try {
    // Vérifier si req.user est défini
    if (!req.user || !req.user.HashedPassword) {
      console.error(
        "Erreur: req.user non défini ou ne contient pas hashedPassword"
      );
      return res.sendStatus(500);
    }
    const isVerified = await argon2.verify(
      req.user.HashedPassword,
      req.body.Password
    );
    if (isVerified) {
      const payload = { sub: req.user.User_ID };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      res.status(200).send({
        authToken: token,
        user: req.user,
        message: "Login successful",
      });
    } else {
      res.status(401).send("Incorrect password");
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
  return null;
};

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.info(authHeader);
    if (!authHeader) {
      return res
        .status(401)
        .send("Vous n'avez pas d'autorisation de voir cette ressource");
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .send({ message: "Authorisation Header is not of the type 'Bearer'" });
    }

    const token = authHeader.replace(/^Bearer\s+/, "");

    // Check for blacklisted tokens
    const [result] = await models.experiedToken.findByToken(token);
    if (result.length > 0) {
      return res.status(401).send("Session Expired. Please log in again.");
    }

    // Wrap jwt.verify in a Promise
    await new Promise((resolve, reject) => {
      // eslint-disable-next-line consistent-return
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error("JWT verification error:", err);

          return reject(new Error("Unauthorized"));
        }
        req.User_ID = decoded.sub;
        resolve();
      });
    });

    next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(401);
  }
  return null;
};

const experiedToken = async (req, res) => {
  const token = req.headers.authorization.replace(/^Bearer\s+/, "");
  await models.experiedToken
    .insert(token)
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
  return null;
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  experiedToken,
};
