const jwt = require("jsonwebtoken");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("./catchAsyncErrors");
const user = require("../models/User");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { authtoken } = req.cookies;
  if (!authtoken) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  const decodedData = jwt.verify(authtoken, process.env.JWT_SECRET);
  req.user = await user.findById(decodedData.id);

  next();
});

const verifyTokenAndHost = (req, res, next) => {
    if (req.user.isHost === "true" || req.user.isAdmin === "true") {
      next();
    } else {
      return next(
        new ErrorHander(
          `User: ${req.user.firstName} is not allowed to access this resouce `,
          403
        )
      );
    }
};
const verifyTokenAndAdmin = (req, res, next) => {
    if (req.user.isAdmin === "true") {
      next();
    } else {
      return next(
        new ErrorHander(
          `User: ${req.user.firstName} is not allowed to access this resouce `,
          403
        )
      );
    }
};

module.exports = {
  verifyTokenAndHost,
  verifyTokenAndAdmin,
  isAuthenticatedUser,
};
