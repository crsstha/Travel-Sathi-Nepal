const express = require("express");
const router = express.Router();
const {
  verifyTokenAndHost,
  verifyTokenAndAuthorization,
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
} = require("../controllers/vehicle");
router.route("/add").post(verifyTokenAndHost, addVehicle);
router.route("/vehicles").get(getAllVehicle);
router.route("/host/vehicles").get(verifyTokenAndHost, getHostVehicles);
router.route("/vehicle/:id").get(getvehicleDetails);
router
  .route("/host/vehicle/:id")
  .put(verifyTokenAndHost, updateVehicle)
  .delete(verifyTokenAndHost, deleteVehicle);

router.route("/review").put(verifyTokenAndAuthorization, createVehicleReview);

router
  .route("/reviews")
  .get(getVehicleReviews)
  .delete(verifyTokenAndAuthorization, deleteReview);

module.exports = router;
