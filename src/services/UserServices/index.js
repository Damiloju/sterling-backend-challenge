/**
 * Bundle all user services into user service object
 */
const userService = {}; // Define the user service object

userService.CreateUserService = require('./CreateUserService');

module.exports = userService;
