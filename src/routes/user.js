const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

// Create a new User.
router.post('', userController.createUser);

module.exports = router;
