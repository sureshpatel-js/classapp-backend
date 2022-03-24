const Joi = require("joi");

exports.validateInstituteBody = async (body) => {
  const schema = Joi.object({
    institute_name: Joi.string().required(),
  });
  try {
    const value = await schema.validateAsync(body);
    return { status: true, body: value };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
