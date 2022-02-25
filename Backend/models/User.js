const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  dob: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  password2: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
