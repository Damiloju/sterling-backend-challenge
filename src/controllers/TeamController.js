const teamSchemas = require('../schemas/teamSchema');
const teamServices = require('../services/TeamServices');
const HTTPStatus = require('../lib/utils/httpStatus');
const RESPONSEMANAGER = require('../lib/response_manager');

const TeamController = {};

TeamController.createTeam = async (req, res) => {
  try {
    await teamSchemas.createTeamSchema.validate(req.body);

    const teamService = new teamServices.CreateTeamService(req.body);

    const registeredTeam = await teamService.createNewTeam();

    return RESPONSEMANAGER.success(
      res,
      HTTPStatus.CREATED,
      'Team created successfully',
      { team: registeredTeam },
    );
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

TeamController.getAllTeams = async (req, res) => {
  try {
    await teamSchemas.fetchTeams.validate(req.query);

    const fetchTeamService = new teamServices.FetchTeamService(req.query);

    const teams = await fetchTeamService.fetchAllTeams();

    return RESPONSEMANAGER.success(
      res,
      HTTPStatus.OK,
      'Teams fetched successfully',
      { teams },
    );
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

TeamController.getTeam = async (req, res) => {
  try {
    const fetchTeamService = new teamServices.FetchTeamService(req.params);

    const team = await fetchTeamService.fetchTeam();

    return RESPONSEMANAGER.success(
      res,
      HTTPStatus.OK,
      'Team fetched successfully',
      { team },
    );
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

module.exports = TeamController;
