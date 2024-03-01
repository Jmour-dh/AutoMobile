const fs = require("node:fs");
const path = require("node:path");
const express = require("express");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  // Ajoutez cette ligne
    allowedHeaders: "Content-Type, Authorization", // Ajoutez cette ligne
  })
);
app.use("/upload", express.static(path.join(__dirname, "../assets/upload")));

const UserRouter = require("./routers/UserRouter");
const MotoRouter = require("./routers/MotoRouter");
const MessageRouter = require("./routers/MessageRouter");
const ServiceRouter = require("./routers/ServiceRouter");
const AvisRouter = require("./routers/AvisRouter");
const ContactRouter = require("./routers/ContactRouter");

app.use(UserRouter);
app.use(MotoRouter);
app.use(MessageRouter);
app.use(ServiceRouter);
app.use(AvisRouter);
app.use(ContactRouter);

app.use("/upload", express.static(path.join(__dirname, "../assets/upload")));

// Serve REACT APP
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // Serve REACT resources
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // Redirect all requests to the REACT index file
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;
