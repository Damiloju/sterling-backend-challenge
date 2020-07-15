const Team = require('../../models/team');

class CreateTeamService {
  constructor(teamData) {
    this.teamData = teamData;
  }

  async storeTeamDetails() {
    const team = await new Team(this.teamData);

    await team.save();

    return team;
  }

  // Register a new user
  async createNewTeam() {
    const team = await this.storeTeamDetails();

    return team;
  }
}

module.exports = CreateTeamService;
