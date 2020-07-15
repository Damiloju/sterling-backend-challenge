/* eslint-disable no-underscore-dangle */
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 100, // start blocking after 100 requests
  keyGenerator: (req) => req.user._id,
  message: {
    error: 'Too many request from this User, please try again after an hour',
  },
});

module.exports = limiter;
