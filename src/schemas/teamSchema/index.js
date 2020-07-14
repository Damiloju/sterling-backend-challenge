/**
 * Bundle all team schemas into team schema object
 */
const teamSchema = {}; // Define the team schema object

teamSchema.createTeamSchema = require('./createTeam');
teamSchema.fetchTeams = require('./fetchTeams');

module.exports = teamSchema;
