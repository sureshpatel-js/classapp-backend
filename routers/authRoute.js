const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
router.route("/setpassword").post(authController.setPassword);
router.route("/login").post(authController.logIn);
router.route("/generateotp").post(authController.generateOtp);
module.exports = router;
