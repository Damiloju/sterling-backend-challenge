const express = require('express');

const router = express.Router();

// GET home page.
router.get('/', (req, res) => res.send({ msg: 'Evisit Portal Api 1.0' }));

module.exports = router;
