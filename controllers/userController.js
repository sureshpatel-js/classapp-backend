const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { validateUserBody } = require("../validate/validateUser");
const { generateOtpAndTime } = require("../utils/otp");
exports.createUser = async (req, res, next) => {
  const value = await validateUserBody(req.body);
  if (!value.status) {
    next(new AppError(400, value.message));
    return;
  }
  const { body } = req;
  try {
    const { hashOtp, otpTime } = await generateOtpAndTime();

    const newUser = await User.create({
      ...body,
      otp: hashOtp,
      otp_time: otpTime,
    });
    const { first_name, last_name, email } = newUser;
    res.status(201).json({
      message: `Check your email: ${email} for OTP.`,
      user: {
        first_name,
        last_name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  res.send("hello");
};
