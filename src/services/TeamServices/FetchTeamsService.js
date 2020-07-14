const Team = require('../../models/team');

class FetchTeamsService {
  constructor(resquestQuery) {
    this.resquestQuery = resquestQuery;
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
      const teams = await Team.paginate(
        {},
        {
          sort,
          page,
          limit,
          pagination,
          customLabels: myCustomLabels,
        },
      );
      return teams;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = FetchTeamsService;
