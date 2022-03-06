const bcrypt = require("bcrypt");

exports.generateOtpAndTime = async () => {
  const hashOtp = await bcrypt.hash("123", 10);
  const time = new Date().getTime() + 600000;
  return {
    hashOtp,
    otpTime: time,
  };
};

exports.checkOtp = async (obj) => {
  const { otp, hashedOtp, otpTime } = obj;
  const validateTime = new Date().getTime() <= otpTime;
  if (!validateTime) {
    return {
      status: false,
      message: "OTP expired.",
    };
  }
  const validateOtp = await bcrypt.compare(otp, hashedOtp);
  if (!validateOtp) {
    return {
      status: false,
      message: "Please enter valid OTP.",
    };
  }
  return {
    status: true,
  };
};
