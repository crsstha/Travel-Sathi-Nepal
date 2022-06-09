const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAdmin,
  isAuthenticatedUser,
} = require("../middleware/verifyToken");

// Controllers
const { update, deletee, getuser, oneuser, getUserDetails, updatePassword } = require("../controllers/user");
router.route("/Update").put(isAuthenticatedUser, update);
router.route("/Update/password").put(isAuthenticatedUser, updatePassword);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/delete/:id").put(isAuthenticatedUser, deletee);
router.route("/find/:id").get(isAuthenticatedUser,verifyTokenAndAdmin, oneuser);
router.route("/").get(isAuthenticatedUser,verifyTokenAndAdmin, getuser);
module.exports = router;
