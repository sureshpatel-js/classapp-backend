const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
router.route('/setpassword').post(authController.setPassword);
router.route('/login').post(authController.logIn);
module.exports = router;