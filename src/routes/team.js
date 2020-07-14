const express = require('express');
const { teamController } = require('../controllers');
const checkDBConnection = require('../middlewares/checkDBConnection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

// Create a new User.
router.post('', [checkDBConnection, auth, admin], teamController.createTeam);
router.get('', [checkDBConnection, auth], teamController.getAllTeams);

module.exports = router;
