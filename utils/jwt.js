const jwt = require("jsonwebtoken");
const { JWT_EXPIRES_IN, JWT_ALGORITHM } = require("../constants/authConstants");

exports.getJwt = async (id) => {
  try {
    var token = await jwt.sign({ id }, "suresh", { expiresIn: JWT_EXPIRES_IN });
    return token;
  } catch (error) {
    console.log(error);
  }
};

exports.verifyJwt = async (token) => {
  try {
    const decoded = await jwt.verify(token, "suresh");
    return {
      status: true,
      decoded,
    };
  } catch (error) {
    console.log("error==>", error.message);
    let message;
    switch (error.message) {
      case "invalid signature":
        message = "Invalid token.";
        break;
      case "jwt expired":
        message = "Token expired, please login again.";
        break;
      default:
        message = error.message;
    }
    return {
      status: false,
      message,
    };
  }
};
