const express = require('express');
const { teamController } = require('../controllers');
const checkDBConnection = require('../middlewares/checkDBConnection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

// Create a new Team.
router.post('', [checkDBConnection, auth, admin], teamController.createTeam);

// Get all Teams.
router.get('', [checkDBConnection, auth], teamController.getAllTeams);

// Get a Team.
router.get('/:id', [checkDBConnection, auth], teamController.getTeam);

// Update a Team.
router.patch('/:id', [checkDBConnection, auth, admin], teamController.editTeam);

// Delete a Team
router.delete(
  '/:id',
  [checkDBConnection, auth, admin],
  teamController.deleteTeam,
);

module.exports = router;
