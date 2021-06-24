const path = require('path');
const express = require("express");
const InitiateMongoServer = require("./database_config/db");
const user = require("./routes/user");
const userDetail = require("./routes/userDetail");
const product = require("./routes/product");

// initiate express
const app = express();

// initiate mongo server
InitiateMongoServer();

// set environment port
const PORT = process.env.PORT || 3001;

// set middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Have Node serve the files for our built React app
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });

/*
 * Router Middleware
 * Router - /user/
 * Method - *
 */
 app.use("/user", user, userDetail);
 /**
  * Router Middleware
  * RoUter - /product/
  * Method - *
  */
 app.use("/product", product);

// listen for connections on declared port
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
