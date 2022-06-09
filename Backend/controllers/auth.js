const express = require("express");
const crypto = require("crypto");
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/verifyToken");
const sendEmail = require("../utils/sendEmail");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

//Route 1: Create a User using:POST no login required
exports.register = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    dob,
    username,
    email,
    password,
    password2,
    about,
    phone,
    isHost,
    avatar,
    isAdmin,
  } = req.body;
  let sucess = false;

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 500,
  });
  
  // check whether the user this email exist already
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return next(new ErrorHander("The email is already exists", 401));
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
    about,
    phone,
    isHost,
    avatar,
    isAdmin,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 200, res);
});

//Route 2: Create a login using:POST login required
exports.login = catchAsyncErrors(async (req, res, next) => {
  //if there are errors
  let sucess = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // check whether the user this email exist already
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return next(
      new ErrorHander(
        "Invalid email or password, Please try to login with correct credentail",
        401
      )
    );
  }
  const passwordcompare = await user.matchPassword(password);
  if (!passwordcompare) {
    return next(
      new ErrorHander(
        "Invalid password, Please try to login with correct Password",
        401
      )
    );
  }
  sendToken(user, 200, res);
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;
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
  await user.save({ validateBeforeSave: false });
  
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
});
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    
    return res.status(400).json({
      sucess: false,
      errors: "Ivalid Token yes",
    });
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    data: "Password Updated Success",
    token: user.getSignedJwtToken(),
  });
});
const sendToken = (user, statusCode, res) => {
  const authtoken = user.getSignedJwtToken();
  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    useCredentials: true,
  };
  res
    .status(statusCode)
    .cookie("authtoken", authtoken, options)
    .json({ sucess: true, user, authtoken, message: "Logged In Successfully" });
};

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("authtoken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
