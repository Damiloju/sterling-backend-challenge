const express = require('express');

const router = express.Router();

const userRoutes = require('./user');
const teamRoutes = require('./team');
const fixtureRoutes = require('./fixture');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);
router.use('/fixtures', fixtureRoutes);

// GET home page.
router.get('/', (req, res) => res.send({ msg: 'Sterling Backend Api 1.0' }));

module.exports = router;
