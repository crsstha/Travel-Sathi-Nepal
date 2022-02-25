const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Cyrus";

//Route 1: Create a User using:POST no login required
router.post(
  "/createUser",
  [
    body("firstName", "Enter your  First Name").isLength({ min: 3 }),
    body("lastName", "Enter your  last Name").isLength({ min: 3 }),
    body("dob", "Enter your DOB").isLength({ min: 3 }),
    body("username", "Enter Valid Username").isLength({ min: 4 }),
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Enter password more than 6 character").isLength({
      min: 6,
    }),
    body("password2", "passwrod invalid").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let sucess = false;
    //if there are errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ sucess, errors: errors.array() });
    }
    // check whether the user this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ sucess, errors: "the email is already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass1 = await bcrypt.hash(req.body.password, salt);
      const secPass2 = await bcrypt.hash(req.body.password2, salt);
      //create a user
      user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        username: req.body.username,
        email: req.body.email,
        password: secPass1,
        password2: secPass2,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({ sucess, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(sucess, "Some error occuured");
    }
  }
);

//Route 2: Create a login using:POST login required
router.post(
  "/login",
  [
    body("email", "Enter Valid Email").isEmail(),
    body("password", "Enter password more than 6 character").exists(),
  ],
  async (req, res) => {
    //if there are errors
    let sucess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user this email exist already
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        sucess = false;
        return res.status(400).json({
          sucess: false,
          errors: "Please try to login with correct credentail",
        });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        sucess = false;
        return res.status(400).json({
          sucess,
          errors: "Please try to login with correct credentail",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({ sucess, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occuured");
    }
  }
);

//Route 3: Get user details after login :post"/user/auth/getuser" :login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occuured");
  }
});

module.exports = router;
