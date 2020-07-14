/**
 * Check if the connection to the db is established
 */

// Require the database config
const mongoose = require('mongoose');

// Test DB Connection
const isdbConnected = async (req, res, next) => {
  try {
    const connected = await mongoose.connection.readyState;

    if (!connected) {
      throw new Error('Could not establish connection with DB');
    }
    return next();
  } catch (error) {
    return res.status(599).json({
      error: error.message,
    });
  }
};

module.exports = isdbConnected;
