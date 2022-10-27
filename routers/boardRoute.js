const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const boardController = require("../controllers/boardController");

router
    .route("/")
    .get(authController.protectRoute, boardController.getBoard)
    .post(authController.protectRoute, boardController.createInstitute)
    .put(authController.protectRoute, boardController.updateBoard);

module.exports = router;
