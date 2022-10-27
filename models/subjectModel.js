const mongoose = require("mongoose");
const { Schema } = mongoose;
const subjectSchema = new Schema({
  subject_name: {
    type: String,
  },
  created_by: {
    type: String,
  },
});
const SubjectModel = mongoose.model("subject", subjectSchema);
module.exports = SubjectModel;
