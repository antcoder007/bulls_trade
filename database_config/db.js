const mongoose = require("mongoose");
const dotenv = require("dotenv");

// initiate dotenv and make environment variables available
dotenv.config();

// database connection & credential string
const MONGOURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@premanshu-cluster.c4pef.mongodb.net/test`;

// connect to database
const InitiateMongoServer = async () => {
    try {
      await mongoose.connect(MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connected to DB");
    } catch (e) {
      console.log(e);
      throw e;
    }
  };
  
  module.exports = InitiateMongoServer;