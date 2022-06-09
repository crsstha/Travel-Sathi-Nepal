const express = require("express");
const router = express.Router();
const {
  verifyTokenAndHost,
  isAuthenticatedUser,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// Controllers
const {
  addVehicle,
  getAllVehicle,
  getHostVehicles,
  getvehicleDetails,
  updateVehicle,
  deleteVehicle,
  createVehicleReview,
  getVehicleReviews,
  deleteReview,
  getAdminVehicles,
} = require("../controllers/vehicle");
router.route("/add").post(isAuthenticatedUser,verifyTokenAndHost, addVehicle);
router.route("/vehicles").get(getAllVehicle);
router.route("/host/vehicles").get(isAuthenticatedUser,verifyTokenAndHost, getHostVehicles);
router.route("/admin/vehicles").get(isAuthenticatedUser,verifyTokenAndHost, verifyTokenAndAdmin, getAdminVehicles);
router.route("/vehicle/:id").get(getvehicleDetails);
router
  .route("/host/vehicle/:id")
  .put(isAuthenticatedUser,verifyTokenAndHost, updateVehicle)
  .delete(isAuthenticatedUser,verifyTokenAndHost, deleteVehicle);

router.route("/review").put(isAuthenticatedUser, createVehicleReview);

router
  .route("/reviews")
  .get(getVehicleReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
