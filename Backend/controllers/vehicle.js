const vehicle = require("../models/Vehicle");
const ErrorHander = require("../utils/errorhander");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create a Vechicle
exports.addVehicle = async (req, res) => {
  try {
    const Vechicle = await vehicle.create(req.body);
    res.status(201).json({
      success: true,
      Vechicle,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

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

    console.log("hello");
    res.status(200).json({
      vehicles,
      success: true,
      vehiclesCount,
      resultPerPage,
      filteredVehiclesCount,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getHostVehicles = async (req, res, next) => {
  const vehicles = await vehicle.find();
  res.status(200).json({
    success: true,
    vehicles,
  });
};

// Get vehicle Details
exports.getvehicleDetails = catchAsyncErrors(async (req, res, next) => {
  const Vehicle = await vehicle.findById(req.params.id);
  if (!Vehicle) {
    return next(new ErrorHander("Product not found", 404));
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
    return next(new ErrorHander("Product not found", 404));
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
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  console.log(req.user._id);
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

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a Vehicle
exports.getVehicleReviews = catchAsyncErrors(async (req, res, next) => {
  const Vehicle = await vehicle.findById(req.query.id);

  if (!Vehicle) {
    return next(new ErrorHander("Product not found", 404));
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
