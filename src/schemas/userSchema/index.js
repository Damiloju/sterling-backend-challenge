/**
 * Bundle all user schema into user schema object
 */
const userSchema = {}; // Define the user schema object

userSchema.createUserSchema = require('./createUser');

module.exports = userSchema;
