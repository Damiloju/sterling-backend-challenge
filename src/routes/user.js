const express = require('express');
const { userController, authController } = require('../controllers');
const checkDBConnection = require('../middlewares/checkDBConnection');

const router = express.Router();

// Create a new User.
router.post('', [checkDBConnection], userController.createUser);

// login user
router.post('/login', [checkDBConnection], authController.authenticateUser);

module.exports = router;
