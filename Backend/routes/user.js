const express = require("express");
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// Controllers
const { update, deletee, getuser, oneuser } = require("../controllers/user");
router.route("/Update/:id").put(verifyTokenAndAuthorization, update);
router.route("/delete/:id").put(verifyTokenAndAuthorization, deletee);
router.route("/find/:id").get(verifyTokenAndAdmin, oneuser);
router.route("/").get(verifyTokenAndAdmin, getuser);
module.exports = router;
