/**
 * Bundle all user schema into user schema object
 */
const authSchema = {}; // Define the user schema object

authSchema.authenticateUserSchema = require('./authenticateUser');

module.exports = authSchema;
