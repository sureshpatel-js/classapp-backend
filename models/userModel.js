
const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  password_createdAt_time: {
    type: Number,
  },
  otp: {
    type: String,
  },
  otp_time: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
