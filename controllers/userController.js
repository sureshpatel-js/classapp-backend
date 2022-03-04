const User = require("../models/user");
const AppError = require("../utils/AppError");
const { validateUserBody } = require("../validate/validateUser");


exports.createUser = async (req, res, next) => {
  const value = await validateUserBody(req.body);
  const { status } = value;
  if (status) {
    const newUser = await User.create(req.body);
  } else {
    next(new AppError(400, value.message));
  }
};



exports.getUser = async (req, res) => {
  res.send("hello");
};
