const vehicle = require("../models/Vehicle");
const ErrorHander = require("../utils/errorhander");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

//Create a Vechicle
exports.addVehicle = catchAsyncErrors(async (req, res) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "vehicles",
      extended: true,
      limit: "50mb",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLinks;

  req.body.host = req.user.id;

  const Vehicle = await vehicle.create(req.body);
  res.status(201).json({
    success: true,
    Vehicle,
  });
});

exports.getAllVehicle = async (req, res, next) => {
  const resultPerPage = 8;
  const vehiclesCount = await vehicle.countDocuments();

  try {
    const apiFeature = new ApiFeatures(vehicle.find(), req.query)
      .search()
      .filter();

    let vehicles = await apiFeature.query;

    let filteredVehiclesCount = vehicles.length;

    apiFeature.pagination(resultPerPage);

    // vehicles = await apiFeature.query;

    res.status(200).json({
      success: true,
      vehicles,
      vehiclesCount,
      resultPerPage,
      filteredVehiclesCount,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAdminVehicles = async (req, res, next) => {
  const vehicles = await vehicle.find();
  res.status(200).json({
    success: true,
    vehicles,
  });
};

exports.getHostVehicles = async (req, res, next) => {
  const vehicles = await vehicle.find({ host: req.user.id });
  res.status(200).json({
    success: true,
    vehicles,
  });
};

// Get vehicle Details
exports.getvehicleDetails = catchAsyncErrors(async (req, res, next) => {
  const Vehicle = await vehicle
    .findById(req.params.id)
    .populate("host", "firstName lastName createdAt avatar")
    .populate("reviews.user", "avatar");
  if (!Vehicle) {
    return next(new ErrorHander("Vehicle not found", 404));
  }

  res.status(200).json({
    success: true,
    Vehicle,
  });
});

// Get vehicle Details Update
exports.updateVehicle = catchAsyncErrors(async (req, res, next) => {
  let Vehicle = await vehicle.findById(req.params.id);
  if (!Vehicle) {
    return next(new ErrorHander("Vehicle not found", 404));
  }
  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < Vehicle.images.length; i++) {
      await cloudinary.v2.uploader.destroy(Vehicle.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "vehicles",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  Vehicle = await vehicle.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    Vehicle,
  });
});

//Delete vechile
exports.deleteVehicle = catchAsyncErrors(async (req, res, next) => {
  const Vehicle = await vehicle.findById(req.params.id);

  if (!Vehicle) {
    return next(new ErrorHander("Product not found", 404));
  }

  await Vehicle.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createVehicleReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, vehicleId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.firstName,
    rating: Number(rating),
    comment,
  };

  const Vehicle = await vehicle.findById(vehicleId);

  const isReviewed = Vehicle.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    Vehicle.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    Vehicle.reviews.push(review);
    Vehicle.numOfReviews = Vehicle.reviews.length;
  }

  let avg = 0;

  Vehicle.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  Vehicle.ratings = avg / Vehicle.reviews.length;

  await Vehicle.save({ validateBeforeSave: false });
  console.log(Vehicle);
  res.status(200).json({
    success: true,
    review,
  });
});

// Get All Reviews of a Vehicle
exports.getVehicleReviews = catchAsyncErrors(async (req, res, next) => {
  const Vehicle = await vehicle.findById(req.query.id);

  if (!Vehicle) {
    return next(new ErrorHander("Vehicle not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: Vehicle.reviews,
  });
});

// Delete Reviews of a Vehicle
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const Vehicle = await vehicle.findById(req.query.vehicleId);

  if (!Vehicle) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = Vehicle.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await vehicle.findByIdAndUpdate(
    req.query.vehicleId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
