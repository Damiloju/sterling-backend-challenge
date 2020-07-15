const Team = require('../../models/team');
const CustomError = require('../../lib/Helpers/CustomError');
const HTTPStatus = require('../../lib/utils/httpStatus');

class UpdateTeamService {
  constructor(resquestData, team) {
    this.resquestData = resquestData;
    this.team = team;
  }

  async updateTeamRecords() {
    const updates = Object.keys(this.resquestData);
    const allowedUpdates = ['name', 'stadium'];
    const isValidOption = updates.every((update) => {
      const u = update;
      return allowedUpdates.includes(u);
    });

    if (!isValidOption) {
      throw new Error('Invalid Updates!');
    }

    const { team } = this;
    const { resquestData } = this;

    if (!team) {
      throw new Error('No team provided');
    }

    // eslint-disable-next-line no-return-assign
    updates.forEach((update) => (team[update] = resquestData[update]));

    await team.save({
      validateBeforeSave: true,
    });

    return team;
  }

  async deleteTeam() {
    // eslint-disable-next-line no-underscore-dangle
    const _id = this.resquestData.id;

    const team = await Team.findOneAndDelete({
      _id,
    });

    if (!team) {
      throw new CustomError(HTTPStatus.NOT_FOUND, 'Team not found');
    }
    return team;
  }
}

module.exports = UpdateTeamService;
