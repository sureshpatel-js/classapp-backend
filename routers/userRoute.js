const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router
  .route("/")
  .get(authController.protectRoute, userController.getUser)
  .post(userController.createUser);

module.exports = router;
