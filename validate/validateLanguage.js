const Joi = require("joi");

exports.validateCreateLanguageBody = async (body) => {
  const schema = Joi.object({
    language_name: Joi.string().required(),
  });
  try {
    const value = await schema.validateAsync(body);
    return { status: true, body: value };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

exports.validateUpdateLanguageBody = async (body) => {
  const schema = Joi.object({
    language_name: Joi.string().required(),
    _id: Joi.string().required(),
  });
  try {
    const value = await schema.validateAsync(body);
    return { status: true, body: value };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
