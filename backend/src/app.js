const fs = require("node:fs");
const path = require("node:path");

// create express app

const express = require("express");

const app = express();

// use some application-level middlewares

app.use(express.json());

const cors = require("cors");

app.use(cors());

const UserRouter = require("./routers/UserRouter");
const MotoRouter = require("./routers/MotoRouter");
const MessageRouter = require("./routers/MessageRouter");
const ServiceRouter = require("./routers/ServiceRouter");

app.use(UserRouter);
app.use(MotoRouter);
app.use(MessageRouter);
app.use(ServiceRouter);

// serve REACT APP
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export

module.exports = app;
