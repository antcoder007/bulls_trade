const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");
const User = require("../model/User");
const UserDetail = require("../model/UserDetail");

/**
 * @method : *
 * @parent_parameter : /user/
 * @description : 
 * this middleware is connected to
 * the @user endpoint and is responsible
 * for querying user node
 */

/**
 * @method : POST
 * @param : /signup
 * @description : User SignUp
 */
 router.post(
    "/signup",
    [
        // check for valid username
        check("username", "Please enter a valid username").notEmpty(),
        // check for valid email
        check("email", "Please enter a valid email address").isEmail(),
        // check for valid password
        check("password", "Please enter a valid password").isLength({
            min: 6,
            max:1024
        }),
        // check for valid address
        check("address", "Please enter a valid address").notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password,
            address
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            userDetail = new UserDetail({
                userId: user._id,
                address
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            await userDetail.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

/**
 * @method : POST
 * @param : /login
 * @description : User Login
 */
router.post(
    "/login",
    [        
    // check for valid email
    check("email", "Please enter a valid email").isEmail(),
    // check for valid password
    check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let user = await User.findOne({
          email
        });
        if (!user)
          return res.status(400).json({
            message: "User does not exist!"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password!"
          });
  
        const payload = {
          user: {
            id: user.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token
            });
          }
        );
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
 * @description : Get LoggedIn User
 * @param : /me
 */
 router.get("/me", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Cannot fetch user..." });
    }
  });

module.exports = router;
