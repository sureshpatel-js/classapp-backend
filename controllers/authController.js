const bcrypt = require("");
const User = require("../models/user");
const AppError = require("../utils/AppError");

exports.setPassword = (req, res, next) => {
  const { password, confirmPassword, otp } = req.body;
};
