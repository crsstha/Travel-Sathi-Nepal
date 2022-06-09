const mongoose = require("mongoose");
const { Schema } = mongoose;

const VehicleSchema = new Schema({
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required:true,
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
    minlength: 2,
  },
  transmission: {
    type: String,
    minlength: 6,
  },
  vehicle_identification :{
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
  totalSeat: {
    type: Number, 
  },
  AdvanceNotice: {
    type: String,
    minlength: 1,
  },
  TripDuration: {
    type: String,
    minlength: 1,
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
    type: Number,
    minlength: 3,
  },
  avaiablity:{
    type: String,
    minlength: 3,
    default: "Avaiable",
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
    default: 0,
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
  endAt: {
    type: Date,
  }
  
});
const vehicle = mongoose.model("Vehicle", VehicleSchema);
module.exports = vehicle;
