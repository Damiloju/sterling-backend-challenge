const express = require('express');
const { userController } = require('../controllers');
const checkDBConnection = require('../middlewares/checkDBConnection');

const router = express.Router();

// Create a new User.
router.post('', [checkDBConnection], userController.createUser);

module.exports = router;
