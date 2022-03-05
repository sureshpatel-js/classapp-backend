const Joi = require("joi");

exports.validateSetPasswordBody = async (body) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().required(),
    repeat_password: Joi.ref("password"),
    otp: Joi.string().required(),
  });
  try {
    const value = await schema.validateAsync(body);
    return { status: true, body: value };
  } catch (error) {
    return { status: false, message: error.message };
  }
};
