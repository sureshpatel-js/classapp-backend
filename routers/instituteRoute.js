const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const instituteController = require("../controllers/instituteController");

router
  .route("/")
  .get(authController.protectRoute, instituteController.getInstitute)
  .post(instituteController.createInstitute)
  .put(authController.protectRoute, instituteController.updateInstitute);

module.exports = router;
