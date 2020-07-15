/**
 * Bundle all controllers into a controller object
 */
const controller = {}; // Define the controller object ...

controller.userController = require('./UserCotroller');
controller.authController = require('./AuthController');
controller.teamController = require('./TeamController');
controller.fixtureController = require('./FixtureController');

module.exports = controller;
