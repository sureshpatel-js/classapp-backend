const Standard = require("../models/instituteModel");
const AppError = require("../utils/errorHandling/AppError");
const { validateCreateStandardBody,
  validateUpdateStandardBody
} = require("../validate/validateStandard");
const {
  STANDARD_CREATED_SUCCESSFULLY,
  STANDARD_UPDATED_SUCCESSFULLY
} = require("../constants/standardConstants");

exports.createStandard = async (req, res, next) => {
  const value = await validateCreateStandardBody(req.body);
  if (!value.status) {
    return next(new AppError(400, value.message));

  }
  const { standard_name } = req.body;
  const standardBody = {
    standard_name,
    created_by: req.user._id,
  };
  try {
    const newStandard = await Standard.create(standardBody);
    res.status(201).json({
      status: "success",
      data: {
        message: STANDARD_CREATED_SUCCESSFULLY,
        standard: newStandard,
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateStandard = async (req, res, next) => {
  const value = await validateUpdateStandardBody(req.body);
  if (!value.status) {
    return next(new AppError(400, value.message));

  }
  const { standard_name, _id } = req.body;
  const standardBody = {
    standard_name,
    created_by: req.user._id,
  };
  try {
    const updatedStandard = await Standard.findByIdAndUpdate(_id, standardBody, { new: true });
    res.status(200).json({
      status: "success",
      data: {
        message: STANDARD_UPDATED_SUCCESSFULLY,
        standard: updatedStandard,
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getStandard = async (req, res, next) => {
  try {
    const standard = await Standard.find();
    res.status(200).json({
      status: "success",
      data: {
        standard
      }
    })
  } catch (error) {
    console.log(error);
  }
}