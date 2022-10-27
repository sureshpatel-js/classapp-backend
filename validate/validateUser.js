const Joi = require("joi");

exports.validateClientAdminSignUp = async (body) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    contact_num: Joi.string().length(10).required(),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
  });
  try {
    const value = await schema.validateAsync(body);
    return { status: true, body: value };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
