const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/').get(userController.getUser).post(userController.createUser);

module.exports = router;