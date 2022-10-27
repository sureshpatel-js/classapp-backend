const Joi = require("joi");

exports.validateCreateStandardBody = async (body) => {
  const schema = Joi.object({
    standard_name: Joi.string().required(),
  });
  try {
    const value = await schema.validateAsync(body);
    return { status: true, body: value };
  } catch (error) {
    return { status: false, message: error.message };
  }
};


exports.validateUpdateStandardBody = async (body) => {
  const schema = Joi.object({
    standard_name: Joi.string().required(),
    _id: Joi.string().required()
  });
  try {
    const value = await schema.validateAsync(body);
    return { status: true, body: value };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
