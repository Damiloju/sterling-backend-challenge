const express = require('express');

const router = express.Router();

const userRoutes = require('./user');
const teamRoutes = require('./team');

router.use('/users', userRoutes);
router.use('/teams', teamRoutes);

// GET home page.
router.get('/', (req, res) => res.send({ msg: 'Evisit Portal Api 1.0' }));

module.exports = router;
