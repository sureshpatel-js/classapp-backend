const mongoose = require("mongoose");
const { Schema } = mongoose;
const standardSchema = new Schema({
  standard_name: {
    type: String,
  },
  created_by: {
    type: String,
  },
});
const StandardModel = mongoose.model("standard", standardSchema);
module.exports = StandardModel;
