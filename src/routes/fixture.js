const express = require('express');
const { fixtureController } = require('../controllers');
const checkDBConnection = require('../middlewares/checkDBConnection');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const rateLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

// Create a new Fixture.
router.post(
  '',
  [checkDBConnection, auth, admin, rateLimiter],
  fixtureController.createFixture,
);

// Get all Fixtures.
router.get(
  '',
  [checkDBConnection, auth, rateLimiter],
  fixtureController.getAllFixtures,
);

// Get all pending Fixtures.
router.get(
  '/pending',
  [checkDBConnection, auth, rateLimiter],
  fixtureController.getAllPendingFixtures,
);

// Get all pending Completed.
router.get(
  '/completed',
  [checkDBConnection, auth, rateLimiter],
  fixtureController.getAllCompletedFixtures,
);

// Search Fixtures
router.get('/search', [checkDBConnection], fixtureController.searchFixtures);

// Get a Fixture.
router.get(
  '/:id',
  [checkDBConnection, auth],
  rateLimiter,
  fixtureController.getFixture,
);

// Update a Fixture.
router.patch(
  '/:id',
  [checkDBConnection, auth, admin, rateLimiter],
  fixtureController.editFixture,
);

// Delete a Fixture
router.delete(
  '/:id',
  [checkDBConnection, auth, admin, rateLimiter],
  fixtureController.deleteFixture,
);

module.exports = router;
