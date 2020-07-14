const express = require('express');

const router = express.Router();

const userRoutes = require('./user');

router.use('/users', userRoutes);

// GET home page.
router.get('/', (req, res) => res.send({ msg: 'Evisit Portal Api 1.0' }));

module.exports = router;
