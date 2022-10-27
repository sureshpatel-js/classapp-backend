const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const languageController = require("../controllers/languageController");

router
  .route("/")
  .get(authController.protectRoute, languageController.getLanguage)
  .post(authController.protectRoute, languageController.createLanguage)
  .put(authController.protectRoute, languageController.updateLanguage);

module.exports = router;
