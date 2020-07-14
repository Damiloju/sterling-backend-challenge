/**
 * Bundle all team services into team service object
 */
const teamService = {}; // Define the team service object

teamService.CreateTeamService = require('./CreateTeamService');
teamService.FetchTeamService = require('./FetchTeamsService');

module.exports = teamService;
