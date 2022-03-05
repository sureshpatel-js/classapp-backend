const bcrypt = require("bcrypt");
const User = require("../models/user");
const AppError = require("../utils/AppError");
const { validateSetPasswordBody } = require("../validate/validateAuth");


exports.setPassword = async (req, res, next) => {
  const { email, password, confirm_password, otp } = req.body;

  const value = await validateSetPasswordBody(req.body);
  const { status } = value;
  if (!status) {
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
    if (otp !== user.otp) {
      res.status(401).json({
        message: "Please provide valid OTP",
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, { password: hashPassword, otp: "" });
    res.status(201).json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.log(error);
  }
};
