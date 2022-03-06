const bcrypt = require("bcrypt");
const User = require("../models/user");
const AppError = require("../utils/AppError");
const {
  validateSetPasswordBody,
  validateLogIn,
} = require("../validate/validateAuth");
const { checkOtp } = require("../utils/otp");
const { checkPassword } = require("../utils/password");

exports.setPassword = async (req, res, next) => {
  const { email, password, otp } = req.body;

  const value = await validateSetPasswordBody(req.body);
  if (!value.status) {
    next(new AppError(400, value.message));
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: `User does not exist with this ${email} email.`,
      });
      return;
    }
    const { otp_time } = user;
    const { status, message } = await checkOtp({
      otp,
      hashedOtp: user.otp,
      otpTime: otp_time,
    });
    if (!status) {
      res.status(400).json({
        message,
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const password_createdAt_time = new Date().getTime();
    await User.findByIdAndUpdate(user._id, {
      password: hashPassword,
      password_createdAt_time,
      otp: null,
      otp_time: null,
    });
    res.status(201).json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.logIn = async (req, res, next) => {
  const { email, password } = req.body;
  const value = await validateLogIn(req.body);
  if (!value.status) {
    next(new AppError(400, value.message));
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: `User does not exist with this ${email} email.`,
    });
    return;
  }
  const { status, message } = await checkPassword({
    hashedPassword: user.password,
    password,
  });
  if (!status) {
    res.status(401).json({
      message,
    });
    return;
  }

  res.status(200).json({
    message: "You are logged in successfully.",
  });
};
