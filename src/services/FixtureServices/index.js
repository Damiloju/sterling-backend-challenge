/**
 * Bundle all user services into user service object
 */
const fixtureService = {}; // Define the user service object

fixtureService.CreateFixtureService = require('./CreateFixtureService');
fixtureService.FetchFixtureService = require('./FetchFixtureService');
fixtureService.UpdateFixtureService = require('./UpdateFixtureService');

module.exports = fixtureService;
