const express = require("express");
//const bodyParser = require("body-parser");
const InitiateMongoServer = require("./database_config/db");

// initiate express
const app = express();

// initiate mongo server
InitiateMongoServer();

// set environment port
const PORT = process.env.PORT || 4000;

// set middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// test request
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// listen for connections on declared port
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
