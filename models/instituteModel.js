const mongoose = require("mongoose");
const { Schema } = mongoose;
const InstituteSchema = new Schema({
  institute_name: {
    type: String,
  },
  created_by: {
    type: Schema.Types.ObjectId,
  },
  created_at: {
    type: Date
  }
});
const InstituteModel = mongoose.model("Institute", InstituteSchema);
module.exports = InstituteModel;
