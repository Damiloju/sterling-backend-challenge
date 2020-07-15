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

module.exports = router;
