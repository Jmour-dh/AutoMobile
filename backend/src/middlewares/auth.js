const argon2 = require("argon2");

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
};

module.exports = {
  hashPassword,
};
