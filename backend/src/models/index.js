const mysql = require("mysql2/promise");
require("dotenv").config();

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
// try a connection

pool
  .getConnection()
  .then((connection) => {
    console.info("Connected to the database!");
    connection.release();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    console.warn(
      "Warning:",
      "Failed to get a DB connection.",
      "Did you create a .env file with valid credentials?",
      "Routes using models won't work as intended"
    );
  });

const models = {};

const UserManager = require("./Manager/UserManager");

models.user = new UserManager();
models.user.setDatabase(pool);

const ExperiedTokenManager = require("./Manager/ExperiedTokenManager");

models.experiedToken = new ExperiedTokenManager();
models.experiedToken.setDatabase(pool);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
