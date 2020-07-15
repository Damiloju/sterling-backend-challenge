const express = require('express');
const { userController, authController } = require('../controllers');
const checkDBConnection = require('../middlewares/checkDBConnection');
const auth = require('../middlewares/auth');

const router = express.Router();

// Create a new User.
router.post('', [checkDBConnection], userController.createUser);

// login user
router.post('/login', [checkDBConnection], authController.authenticateUser);

// logout user
router.post('/logout', [checkDBConnection, auth], authController.logOut);

// logut user sessions
router.post(
  '/logout/all-sessions',
  [checkDBConnection, auth],
  authController.logOutAllSessions,
);

module.exports = router;
