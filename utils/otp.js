const bcrypt = require("bcrypt");

exports.generateOtpAndTime = async () => {
  const hashOtp = await bcrypt.hash("123", 10);
  const time = new Date().getTime();
  return {
    hashOtp,
    otpTime: time,
  };
};

//exports.checkOtp = async
