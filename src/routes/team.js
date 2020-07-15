const express = require('express');
const { teamController } = require('../controllers');
const checkDBConnection = require('../middlewares/checkDBConnection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const rateLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

// Create a new Team.
router.post(
  '',
  [checkDBConnection, auth, admin, rateLimiter],
  teamController.createTeam,
);

// Get all Teams.
router.get(
  '',
  [checkDBConnection, auth, rateLimiter],
  teamController.getAllTeams,
);

// Search team
router.get('/search', [checkDBConnection], teamController.searchTeams);

// Get a Team.
router.get(
  '/:id',
  [checkDBConnection, auth, rateLimiter],
  teamController.getTeam,
);

// Update a Team.
router.patch(
  '/:id',
  [checkDBConnection, auth, admin, rateLimiter],
  teamController.editTeam,
);

// Delete a Team
router.delete(
  '/:id',
  [checkDBConnection, auth, admin, rateLimiter],
  teamController.deleteTeam,
);

module.exports = router;
