const mongoose = require("mongoose");
const { Schema } = mongoose;
const StudentExamSchema = new Schema({
  subject_id: {
    type: Schema.Types.ObjectId,
  },
  marks_obtained: {
    type: Number
  },
  exam_marks: {
    type: Number
  },
  exam_type_id: {
    type: Schema.Types.ObjectId,
  },
  student_id: {
    type: Schema.Types.ObjectId,
  },
  created_by: {
    type: Schema.Types.ObjectId,
  },
  created_at: {
    type: Date
  }
});
const StudentExamModel = mongoose.model("studentExam", StudentExamSchema);
module.exports = StudentExamModel;
