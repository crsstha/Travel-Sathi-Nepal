const { verifyToken } = require("../middleware/verifyToken");
const user = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

//Update User
exports.update = async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    req.body.password2 = req.body.password;
  }

  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
    console.log("yes");
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
