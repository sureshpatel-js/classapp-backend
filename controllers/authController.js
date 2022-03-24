const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { generateOtpAndTime, checkOtp } = require("../utils/otp");
const {
  validateSetPasswordBody,
  validateLogIn,
  validateGenerateOtpBody,
} = require("../validate/validateAuth");
const { checkPassword } = require("../utils/password");
const { getJwt, verifyJwt } = require("../utils/jwt");
const {
  INTERNAL_SERVER_ERROR,
  USER_BELONGS_TO_THIS_TOKEN_DELETED,
  YOU_HAVE_NOT_CREATED_PASSWORD_YET,
  YOU_CHANGED_PASSWORD_PLEASE_LOGIN_AGAIN,
} = require("../constants/authConstants");
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

  if (!user.password) {
    next(new AppError(400, YOU_HAVE_NOT_CREATED_PASSWORD_YET));
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
      next(new AppError(500, INTERNAL_SERVER_ERROR));
      return;
    }
    res.status(200).json({
      message: `Check your email: ${updatedUser.email} for OTP.`,
      email: updatedUser.email,
    });
  } catch (error) {
    console.log(error);
  }
};

//1648134614
//1648134606750

exports.protectRoute = async (req, res, next) => {
  const value = await verifyJwt(req.headers.token);
  if (!value.status) {
    next(new AppError(401, value.message));
    return;
  }
  console.log(value);
  try {
    const user = await User.findById(id);
    if (!user) {
      next(new AppError(404, USER_BELONGS_TO_THIS_TOKEN_DELETED));
      return;
    }
    const token_createdAt_time = iat * 1000;
    const { password_createdAt_time } = user;
    const result = token_createdAt_time > password_createdAt_time;
    if (!result) {
      next(new AppError(401, YOU_CHANGED_PASSWORD_PLEASE_LOGIN_AGAIN));
      return;
    }
    req.user = user;
  } catch (error) {
    console.log(error);
  }
  next();
};
