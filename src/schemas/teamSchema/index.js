/**
 * Bundle all team schemas into team schema object
 */
const teamSchema = {}; // Define the team schema object

teamSchema.createTeamSchema = require('./createTeam');
teamSchema.fetchTeams = require('./fetchTeams');
teamSchema.editTeam = require('./editTeam');
teamSchema.searchTeams = require('./searchTeams');

module.exports = teamSchema;
