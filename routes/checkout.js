const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("../middleware/auth");
const User = require("../model/User");
const Product = require("../model/Product");
const Checkout = require("../model/Checkout");

/**
 * @method : *
 * @parent_parameter : /checkout/
 * @description : 
 * this middleware is connected to
 * the @checkout endpoint and is responsible
 * for querying checkout node
 */

/**
 * @method : POST
 * @param : /
 * @description : Create Checkout
 */
 router.post(
    "/:id",
    [        
    // check for valid name
    check("paymentType", "Please enter a valid payment type").isLength({
        min: 3
    }),
    // check for valid price
    check("price", "Please enter a valid price").isNumeric()
    ], auth,
    async (req, res) => {
        const errors = validationResult(req);
  
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array()
          });
        }

        // get id of loggedIn user
        const shipping = req.user.id;
        console.log("userId is: ", shipping);
        // get input information
        const {
            products,
            paymentType,
            price
          } = req.body;

      try{            
          // create a new product from above info
          checkout = new Checkout({
              shipping,
              products,
              paymentType,
              price
          });

          // save product
          await checkout.save();
          // save this product for loggedIn user
          detail.history.push(products);
          // save new user detail
          await detail.save();
          res.status(200).json({
            message: "The checkout was successfull."
        });

      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );  
