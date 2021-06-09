const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");
const User = require("../model/User");
const UserDetail = require("../model/UserDetail");
const Prodcut = require("../model/Product");

/**
 * @method - POST
 * @param - /product
 * @description - Create Product
 */
 router.post(
    "/product",
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
    check("price", "Please enter a valid price").isNumeric()
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { 
            createdBy, 
            productName, 
            productDescription, 
            price, 
            image 
        } = req.body;

        product = new product({
            createdBy,
            productName,
            productDescription,
            price,
            image
        });
  
    }
  );  

