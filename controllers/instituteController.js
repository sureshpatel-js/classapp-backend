const Institute = require("../models/instituteModel");
const AppError = require("../utils/AppError");
const { validateInstituteBody } = require("../validate/validateInstitute");

exports.createInstitute = async (req, res, next) => {
  const value = await validateInstituteBody(req.body);
  if (!value.status) {
    next(new AppError(400, value.message));
    return;
  }
  try {
    const newInstitute = await Institute.create(req.body);
    res.status(201).json({
      message: "Institute created succrssfully.",
      institute: newInstitute,
    });
  } catch (error) {
    console.log(error);
  }
};
