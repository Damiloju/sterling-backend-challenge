/**
 * Bundle all team services into team service object
 */
const teamService = {}; // Define the team service object

teamService.CreateTeamService = require('./CreateTeamService');
teamService.FetchTeamService = require('./FetchTeamsService');
teamService.UpdateTeamService = require('./UpdateTeamService');

module.exports = teamService;
