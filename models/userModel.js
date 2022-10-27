const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  user_type: {
    type: String
  },
  email: {
    type: String,
  },
  address: {
    type: String
  },
  company_id: {
    type: Schema.Types.ObjectId
  },
  contact_num: {
    type: String,
  },
  student_enrollerd_for_subject: {
    type: Array
  },
  student_standard: {
    type: String
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  },
  created_by: {
    type: Schema.Types.ObjectId
  },
  hashed_password: {
    type: String,
  },
  password_updated_at: {
    type: Number,
  },
  hashed_otp: {
    type: String,
  },
  otp_created_at: {
    type: Number,
  },
  last_login_at: {
    type: Date
  },

  active_status: {
    type: Boolean
  },
  email_verified: {
    type: Boolean
  }
});

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
