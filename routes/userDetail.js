const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");
const User = require("../model/User");
const UserDetail = require("../model/UserDetail");

/**
 * @method - GET
 * @description - Get details of LoggedIn User
 * @param - /user/detail
 */
 router.get("/detail", auth, async (req, res) => {
    try {
      /**
       * find user details by userId
       * through jwt token header of
       * the loggedIn user
       */
      const userDetail = await UserDetail.findOne({ userId : req.user.id});
      res.json(userDetail);
    } catch (e) {
      res.send({ message: "Cannot fetch user details..." });
    }
  });

  module.exports = router;
