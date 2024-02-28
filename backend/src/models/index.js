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
  multipleStatements: true, // Activez cette option pour prendre en charge plusieurs déclarations dans une seule requête (nécessaire pour les transactions)
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

const MotoManager = require("./Manager/MotoManager");

models.moto = new MotoManager();
models.moto.setDatabase(pool);

const MessageManager = require("./Manager/MessageManager");

models.message = new MessageManager();
models.message.setDatabase(pool);

const ServiceManager = require("./Manager/ServiceManager");

models.service = new ServiceManager();
models.service.setDatabase(pool);

const AvisManager = require("./Manager/AvisManager");

models.avis = new AvisManager();
models.avis.setDatabase(pool);

const ContactManager = require("./Manager/ContactManager");

models.contact = new ContactManager();
models.contact.setDatabase(pool);

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
