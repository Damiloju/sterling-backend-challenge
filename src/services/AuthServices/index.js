/**
 * Bundle all authentication services into auth service object
 */
const authService = {}; // Define the auth service object

authService.AuthenticateUserService = require('./AuthenticateUserService');

module.exports = authService;
