// FR Chargement des variables d'environnement depuis le fichier .env
// GB Loading environment variables from the .env file
require("dotenv").config();

// FR Importation du module HTTP intégré à Node.js
// GB Importing the built-in HTTP module in Node.js
const http = require("http");

// FR Importation de l'application express depuis le fichier app.js
// GB Importing the express application from the app.js file
const app = require("./src/app");

// FR Configuration du serveur HTTP en utilisant l'application express
// GB Configuring the HTTP server using the express application
const server = http.createServer(app);

// FR Définition du port pour le serveur HTTP, utilisant le port spécifié dans les variables d'environnement ou le port 5000 par défaut
// GB Defining the port for the HTTP server, using the port specified in the environment variables or the default port 5000
const port = process.env.APPLICATION_PORT || 5000;

// FR Démarrage du serveur HTTP pour écouter les requêtes sur le port spécifié
// GB Starting the HTTP server to listen for requests on the specified port
server.listen(port, () => {
  console.info(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
