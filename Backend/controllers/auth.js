const express = require("express");
const crypto = require("crypto");
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/verifyToken");
const sendEmail = require("../utils/sendEmail");

//Route 1: Create a User using:POST no login required
exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    username,
    email,
    password,
    password2,
    isHost,
    isAdmin,
  } = req.body;
  let sucess = false;
  // check whether the user this email exist already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ sucess, errors: "the email is already exists" });
    }
    //create a user
    user = await User.create({
      firstName,
      lastName,
      dob,
      username,
      email,
      password,
      password2,
      isHost,
      isAdmin,
    });
    sendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({ sucess, errors: error.message });
    console.error(error.message);
  }
};

//Route 2: Create a login using:POST login required
exports.login = async (req, res) => {
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
    const passwordcompare = await user.matchPassword(password);
    if (!passwordcompare) {
      sucess = false;
      return res.status(400).json({
        sucess,
        errors: "Please try to login with correct Password",
      });
    }
    sendToken(user, 200, res);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occuured");
  }
};

//Route 3: Get user details after login :post"/user/auth/getuser" :login required

(exports.getUser = fetchuser),
  async (req, res) => {
    try {
      const userID = req.user.id;
      const user = await User.findById(userID).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occuured");
    }
  };

exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      sucess = false;
      return res.status(400).json({
        sucess: false,
        errors: "Email Doesnt Exist Please Register an accout",
      });
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided emailm
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(500).json({
        sucess: false,
        errors: "Email could not be sent",
      });
    }
  } catch (err) {
    console.log("Error");
  }
};
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.error(resetPasswordToken);
    if (!user) {
      return res.status(400).json({
        sucess: false,
        errors: "Ivalid Token yes",
      });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    console.error(error.message);
  }
};
const sendToken = (user, statusCode, res) => {
  const authtoken = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, authtoken });
};
