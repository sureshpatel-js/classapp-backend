const UserModel = require("../models/userModel");
const AppError = require("../utils/errorHandling/AppError");
const { generateOtpAndTime } = require("../utils/auth/otp");
const { validateClientAdminSignUp } = require("../validate/validateUser");
const { UNABLE_TO_SEND_OTP,
  UNABLE_TO_CREATE_USER,
  USER_ALREADY_EXIST
} = require("../constants/userControllerConstants");
const sendMail = require("../utils/nodemailer/nodemailer");

exports.clientAdminSignUp = async (req, res, next) => {
  const value = await validateClientAdminSignUp(req.body);
  if (!value.status) {
    return next(new AppError(400, value.message));
  }
  //Step 1 Find user.
  const findUser = await UserModel.findOne({ email: req.body.email });
  //If user exist and email is verified, then return to login page.
  if (findUser && findUser.email_verified === true) {
    return next(new AppError(409, USER_ALREADY_EXIST));
  }
  try {
    const { first_name, last_name, email, institute_name } = req.body;
    const { otp, hashedOtp, otpCreatedAt } = await generateOtpAndTime();

    let newUser;
    //If user does not exist create one and send otp
    if (!findUser) {
      newUser = await UserModel.create({
        first_name,
        last_name,
        email,
        user_type: "ADMIN",
        hashed_otp: hashedOtp,
        otp_created_at: otpCreatedAt,
        email_verified: false
      });
      //If user exist and email is not verified, then send otp and update user.
    } else if (findUser && findUser.email_verified === false) {
      newUser = await UserModel.findByIdAndUpdate(findUser._id, {
        hashed_otp: hashedOtp,
        otp_created_at: otpCreatedAt,
      });
    }
    const sendMailStatus = await sendMail(
      email,
      "OTP Verification.",
      ``,
      `Hi ${first_name}, please use this OTP to verify your email address.</br> <b>${otp}</b> `,
    );
    if (!sendMailStatus) {
      return next(new AppError(500, UNABLE_TO_SEND_OTP));
    }
    res.status(201).json({
      message: `Check your email: ${email} for OTP.`,
      user: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(500, UNABLE_TO_CREATE_USER));
  }
}

exports.getUser = async (req, res) => {
  res.send("hello");
  console.log(req.user);
};
