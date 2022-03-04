const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  fNmae: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
