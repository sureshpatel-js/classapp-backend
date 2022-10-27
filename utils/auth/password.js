const bcrypt = require("bcrypt");

exports.checkPassword = async (obj) => {
  const { hashedPassword, password } = obj;
  const validatePassword = await bcrypt.compare(password, hashedPassword);
  if (!validatePassword) {
    return {
      status: false,
      message: "Please enter valid password.",
    };
  }
  return {
    status: true,
  };
};
