const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const standardController = require("../controllers/standardController");

router
  .route("/")
  .get(authController.protectRoute, standardController.getStandard)
  .post(authController.protectRoute, standardController.createStandard)
  .post(authController.protectRoute, standardController.updateStandard);

module.exports = router;
