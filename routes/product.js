const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("../middleware/auth");
const User = require("../model/User");
const UserDetail = require("../model/UserDetail");
const Product = require("../model/Product");

/**
 * @method : *
 * @parent_parameter : /product/
 * @description : 
 * this middleware is connected to
 * the @product endpoint and is responsible
 * for querying product node
 */

/**
 * @method : POST
 * @param : /
 * @description : Create Product
 */
 router.post(
    "/",
    [        
    // check for valid name
    check("productName", "Please enter a valid name").isLength({
        min: 3
    }),
    // check for valid description
    check("productDescription", "Please enter a valid description").isLength({
        min: 10
    }),
    // check for valid price
    check("price", "Please enter a valid price").isNumeric(),
    // check for valid image URL
    check("image", "Please enter a valid URL").isURL()
    ], auth,
    async (req, res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array()
          });
        }

        // get id of loggedIn user
        const createdBy = req.user.id;
        console.log("userId is: ", createdBy);
        // get input information
        const {
              productName, 
              productDescription, 
              price, 
              image 
          } = req.body;

      try{            
          // create a new product from above info
          product = new Product({
              createdBy,
              productName,
              productDescription,
              price,
              image
          });
          
          const detail = await UserDetail.findOne({userId: createdBy});

          // save product
          await product.save();
          // save this product for loggedIn user
          detail.myProducts.push(product);
          // save new user detail
          await detail.save();
          res.status(200).json({
            message: "The product was created."
        });

      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );  

/**
 * @method : GET
 * @param : /
 * @description : GET all products
 */
 router.get("/", async (req, res) => {
  try {
    const list = await Product.find({});
    res.json(list);
  } catch (e) {
    console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
  }
});

  module.exports = router;
