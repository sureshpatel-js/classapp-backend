const Language = require("../models/languageModel");
const AppError = require("../utils/errorHandling/AppError");
const { validateCreateLanguageBody,
  validateUpdateLanguageBody
} = require("../validate/validateLanguage");
const {
  LANGUAGE_CREATED_SUCCESSFULLY,
  LANGUAGE_UPDATED_SUCCESSFULLY
} = require("../constants/languageConstants");

exports.createLanguage = async (req, res, next) => {
  const value = await validateCreateLanguageBody(req.body);
  if (!value.status) {
    return next(new AppError(400, value.message));

  }
  const { language_name } = req.body;
  const languageBody = {
    language_name,
    created_by: req.user._id,
  };
  try {
    const newLanguage = await Language.create(languageBody);
    res.status(201).json({
      status: "success",
      data: {
        message: LANGUAGE_CREATED_SUCCESSFULLY,
        language: newLanguage,
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateLanguage = async (req, res, next) => {
  const value = await validateUpdateLanguageBody(req.body);
  if (!value.status) {
    return next(new AppError(400, value.message));

  }
  const { language_name, _id } = req.body;
  const languageBody = {
    language_name,
    created_by: req.user._id,
  };
  try {
    const updatedLanguage = await Language.findByIdAndUpdate(_id, languageBody, { new: true });
    res.status(201).json({
      status: "success",
      data: {
        message: LANGUAGE_UPDATED_SUCCESSFULLY,
        language: updatedLanguage,
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getLanguage = async (req, res, next) => {
  try {
    const language = await Language.find();
    res.status(200).json({
      status: "success",
      data: {
        language
      }
    });
  } catch (error) {
    console.log(error);
  }
}