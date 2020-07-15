/**
 * Bundle all team schemas into team schema object
 */
const fixtureSchema = {}; // Define the team schema object

fixtureSchema.createFIxtureSchema = require('./createFixture');
fixtureSchema.fetchFixturesSchema = require('./fetchFixtures');
fixtureSchema.editFixtureSchema = require('./editFixture');
fixtureSchema.searchFixtureSchema = require('./searchFixtures');

module.exports = fixtureSchema;
