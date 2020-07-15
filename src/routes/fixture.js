const express = require('express');
const { fixtureController } = require('../controllers');
const checkDBConnection = require('../middlewares/checkDBConnection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

const router = express.Router();

// Create a new Fixture.
router.post(
  '',
  [checkDBConnection, auth, admin],
  fixtureController.createFixture,
);

// Get all Fixtures.
router.get('', [checkDBConnection, auth], fixtureController.getAllFixtures);

// Get all pending Fixtures.
router.get(
  '/pending',
  [checkDBConnection, auth],
  fixtureController.getAllPendingFixtures,
);

// Get all pending Completed.
router.get(
  '/completed',
  [checkDBConnection, auth],
  fixtureController.getAllCompletedFixtures,
);

// Get a Fixture.
router.get('/:id', [checkDBConnection, auth], fixtureController.getFixture);

module.exports = router;
