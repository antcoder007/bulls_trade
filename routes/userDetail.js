const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");
const User = require("../model/User");
const UserDetail = require("../model/UserDetail");
const Product = require("../model/Product");

/**
 * @method : *
 * @parent_parameter : /user/
 * @description : 
 * this middleware is connected to
 * the @user endpoint and is responsible
 * for querying userDetail node
 */

/**
 * @method : GET
 * @description : Get details of LoggedIn User
 * @param : /detail
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

/**
 * @method : GET
 * @description : Get list of prdocuts for loggedIn user
 * @param : /prodcut
 */
 router.get("/product", auth, async (req, res) => {
    try {
      const productList = await UserDetail.findOne({ userId : req.user.id}).populate('myProducts');
      res.json(productList);
    } catch (e) {
      res.send({ message: "Cannot fetch prodcuts..." });
    }
  });

/**
 * @method : GET
 * @description : Get wishlist of prdocuts for loggedIn user
 * @param : /watch
 */
 router.get("/watch", auth, async (req, res) => {
  try {
    const productList = await UserDetail.findOne({ userId : req.user.id}).populate('watchList');
    res.json(productList);
  } catch (e) {
    res.send({ message: "Cannot fetch prodcuts..." });
  }
});

  /**
 * @method : POST
 * @param : /watch
 * @description : Add to watchlist
 */
 router.post(
  "/watch", auth, async (req, res) => {
    
      // get id of loggedIn user
      const createdBy = req.user.id;
      // console.log("userId is: ", createdBy);
    try{  
      /**
       * get product id from body =>
       * ____Get this id from `user_selected` product
       * on front-end and send in through request
       * @headers i.e. id: __
       */
        const product_id = req.body.id;
      // find user detail document
        const detail = await UserDetail.findOne({userId: createdBy});
      // find product document by id
        const product = await Product.findOne({productId: product_id})
      // push products in user wishlist
        detail.watchList.push(product);
      // save new user detail
        await detail.save();
        res.status(200).json({
          message: "The product was stored in wishlist."
      });

    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);  

  module.exports = router;
