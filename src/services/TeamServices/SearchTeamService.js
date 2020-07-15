const Team = require('../../models/team');

class SearchTeamsService {
  constructor(query) {
    this.query = query;
  }

  async searchTeams() {
    const name = this.query.name || '';
    const stadium = this.query.stadium || '';

    const result = await Team.find({
      $and: [
        { name: { $regex: `.*${name}.*`, $options: 'i' } },
        { stadium: { $regex: `.*${stadium}.*`, $options: 'i' } },
      ],
    });
    return result;
  }
}

module.exports = SearchTeamsService;
