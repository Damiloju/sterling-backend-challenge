const Team = require('../../models/team');

class SearchTeamsService {
  constructor(query) {
    this.query = query;
  }

  async searchTeams() {
    let name = '';
    let stadium = '';
    if (this.query.name) {
      name = this.query.name;
    }
    if (this.query.stadium) {
      stadium = this.query.stadium;
    }

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
