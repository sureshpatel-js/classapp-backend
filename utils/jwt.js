const jwt = require("jsonwebtoken");
const { JWT_EXPIRES_IN, JWT_ALGORITHM } = require("../constants/authConstants");

exports.getJwt = async (id) => {
  try {
    var token = await jwt.sign({ id }, "suresh");
    return token;
  } catch (error) {
    console.log(error);
  }
};
