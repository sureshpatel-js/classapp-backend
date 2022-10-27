const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/adminSignUp")
  .post(userController.clientAdminSignUp);

module.exports = router;