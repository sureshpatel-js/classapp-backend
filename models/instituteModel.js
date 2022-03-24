const mongoose = require("mongoose");
const { Schema } = mongoose;
const instituteSchema = new Schema({
  institute_name: {
    type: String,
  },
});
const Institute = mongoose.model("Institute",instituteSchema);
module.exports = Institute;
