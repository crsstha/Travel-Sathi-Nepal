const { verifyToken } = require("../middleware/verifyToken");
const user = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const ErrorHander = require("../utils/errorhander");

//Update User
exports.update = catchAsyncErrors(async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    req.body.password2 = req.body.password;
  }
  if (req.body.avatar !== undefined) {
    const User = await user.findById(req.user.id);
    
    const imageId = User.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 500,
      crop: "scale",
    });
    req.body.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  if (req.body.driver_lc !== undefined) {
    let driver_lc = [];

    if (typeof req.body.driver_lc === "string") {
      driver_lc.push(req.body.driver_lc);
    } else {
      driver_lc = req.body.driver_lc;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(driver_lc[i], {
        folder: "driver_lc",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
      req.body.driver_lc = imagesLinks;
    }
  }
 
    const updatedUser = await user.findByIdAndUpdate(
      req.user.id,
      
      {
        $set: req.body,
      },
      { new: true ,runValidators: true,
        useFindAndModify: false,}
    );
    
    res.status(200).json({success:true,updatedUser});
});

exports.updatePassword = catchAsyncErrors(async (req, res,next) => {
  const User = await user.findById(req.user.id).select("+password");
  const passwordcompare = await User.matchPassword(req.body.oldPassword);
  console.log(passwordcompare)
  if (!passwordcompare) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  User.password = req.body.newPassword;

  await User.save();

  sendToken(User, 200, res);
});

exports.getUserDetails = async (req, res, next) => {
  try {
    const User = await user.findById(req.user.id);
    res.status(200).json({
      success: true,
      User,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete user
exports.deletee = async (req, res) => {
  try {
    const deleteUser = await user.findByIdAndDelete(req.params.id);
    res.status(200).json("The User has been Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get USER
exports.oneuser = async (req, res) => {
  try {
    const User = await user.findById(req.params.id);
    res.status(200).json(User);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all USER
exports.getuser = async (req, res) => {
  const query = req.query.new;
  try {
    const User = query
      ? await user.find().sort({ _id: -1 }).limit(1)
      : await user.find();
    res.status(200).json(User);
  } catch (err) {
    res.status(500).json(err);
  }
};
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