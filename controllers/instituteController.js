const Institute = require("../models/instituteModel");
const AppError = require("../utils/errorHandling/AppError");
const { validateCreateInstituteBody,
  validateUpdateInstituteBody
} = require("../validate/validateInstitute");
const {
  INSTITUTE_CREATED_SUCCESSFULLY,
  INSTITUTE_UPDATED_SUCCESSFULLY
} = require("../constants/instituteConstants");

exports.createInstitute = async (req, res, next) => {
  const value = await validateCreateInstituteBody(req.body);
  if (!value.status) {
    return next(new AppError(400, value.message));

  }
  const { institute_name } = req.body;
  const instituteBody = {
    institute_name,
    created_by: req.user._id,
  };
  try {
    const newInstitute = await Institute.create(instituteBody);
    res.status(201).json({
      status: "success",
      data: {
        message: INSTITUTE_CREATED_SUCCESSFULLY,
        institute: newInstitute,
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateInstitute = async (req, res, next) => {
  const value = await validateUpdateInstituteBody(req.body);
  if (!value.status) {
    return next(new AppError(400, value.message));

  }
  const { institute_name, _id } = req.body;
  const instituteBody = {
    institute_name,
    created_by: req.user._id,
  };
  try {
    const updatedInstitute = await Institute.findByIdAndUpdate(_id, instituteBody, { new: true });
    res.status(201).json({
      status: "success",
      data: {
        message: INSTITUTE_UPDATED_SUCCESSFULLY,
        institute: updatedInstitute,
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getInstitute = async (req, res, next) => {
  try {
    const institute = await Institute.find();
    res.status(200).json({
      status: "success",
      data: {
        institute
      }
    })
  } catch (error) {
    console.log(error)
  }
}
