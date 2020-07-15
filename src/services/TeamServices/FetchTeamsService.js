const Team = require('../../models/team');
const CustomError = require('../../lib/Helpers/CustomError');
const HTTPStatus = require('../../lib/utils/httpStatus');

class FetchTeamsService {
  constructor(resquestQuery, query = {}) {
    this.resquestQuery = resquestQuery;
    this.query = query;
  }

  async fetchAllTeams() {
    const { sort = 'desc' } = this.resquestQuery;
    const { page = 1 } = this.resquestQuery;
    const { limit = 10 } = this.resquestQuery;
    const { pagination = true } = this.resquestQuery;
    const myCustomLabels = {
      totalDocs: 'dataCount',
      docs: 'data',
      totalPages: 'pageCount',
    };
    try {
      const teams = await Team.paginate(this.query, {
        sort,
        page,
        limit,
        pagination,
        customLabels: myCustomLabels,
      });
      return teams;
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchTeam() {
    const { id } = this.resquestQuery;
    const team = await Team.findOne({
      _id: id,
    }).populate('fixtures');
    if (!team) {
      throw new CustomError(HTTPStatus.NOT_FOUND, 'Team not found');
    }
    return team;
  }
}

module.exports = FetchTeamsService;
