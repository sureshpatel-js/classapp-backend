const bcrypt = require("bcrypt");
const User = require("../models/user");
const AppError = require("../utils/AppError");
const { generateOtpAndTime, checkOtp } = require("../utils/otp");
const {
  validateSetPasswordBody,
  validateLogIn,
  validateGenerateOtpBody,
} = require("../validate/validateAuth");
const { checkPassword } = require("../utils/password");
const { getJwt } = require("../utils/jwt");
const { INTERNAL_SERVER_ERROR } = require("../constants/authConstants");
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
  const token = await getJwt(user._id);
  res.status(200).json({
    message: "You are logged in successfully.",
    token,
    user: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });
};

exports.generateOtp = async (req, res, next) => {
  const { email } = req.body;
  const value = await validateGenerateOtpBody(req.body);
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
    const { hashOtp, otpTime } = await generateOtpAndTime();
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      otp: hashOtp,
      otp_time: otpTime,
    });
    if (!updatedUser) {
      next(new AppError(500), INTERNAL_SERVER_ERROR);
    }
    res.status(200).json({
      message: `Check your email: ${updatedUser.email} for OTP.`,
      email: updatedUser.email,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.protectRoute = async()=>{
  
}
