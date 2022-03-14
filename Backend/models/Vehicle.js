const mongoose = require("mongoose");
const { Schema } = mongoose;

const VehicleSchema = new Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  location: {
    type: String,
    minlength: 3,
  },
  manufacture_year: {
    type: String,
    minlength: 3,
  },
  company: {
    type: String,
  },
  model: {
    type: String,
  },
  odometer: {
    type: String,
    minlength: 6,
  },
  transmission: {
    type: String,
    minlength: 6,
  },

  vehicle_type: {
    type: String,
    minlength: 3,
  },
  category: {
    type: String,
    minlength: 3,
  },

  AdvanceNotice: {
    type: String,
    minlength: 3,
  },
  TripDuration: {
    type: String,
    minlength: 3,
  },

  LicensePlate: {
    type: String,
    minlength: 3,
  },
  State: {
    type: String,
    minlength: 3,
  },
  description: {
    type: String,
    minlength: 3,
  },
  features: {
    type: String,
    minlength: 3,
  },
  min_price: {
    type: String,
    minlength: 3,
  },
  max_price: {
    type: String,
    minlength: 3,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    defaulf: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      name: {
        type: String,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const vehicle = mongoose.model("vehicle", VehicleSchema);
module.exports = vehicle;
