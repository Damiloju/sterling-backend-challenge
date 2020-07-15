const Fixture = require('../../models/fixture');
const CustomError = require('../../lib/Helpers/CustomError');
const HTTPStatus = require('../../lib/utils/httpStatus');

class UpdateFixtureService {
  constructor(resquestData, fixture) {
    this.resquestData = resquestData;
    this.fixture = fixture;
  }

  async updateFixtureRecords() {
    const updates = Object.keys(this.resquestData);
    const allowedUpdates = [
      'homeTeamScore',
      'awayTeamScore',
      'status',
      'teamStadium',
      'homeTeam',
      'awayTeam',
      'date',
    ];
    const isValidOption = updates.every((update) => {
      const u = update;
      return allowedUpdates.includes(u);
    });

    if (!isValidOption) {
      throw new Error('Invalid Updates!');
    }

    const { fixture } = this;
    const { resquestData } = this;

    if (!fixture) {
      throw new Error('No fixture provided');
    }

    // eslint-disable-next-line no-return-assign
    updates.forEach((update) => (fixture[update] = resquestData[update]));

    await fixture.save({
      validateBeforeSave: true,
    });

    return fixture;
  }

  async deleteFixture() {
    // eslint-disable-next-line no-underscore-dangle
    const _id = this.resquestData.id;

    const fixture = await Fixture.findOneAndDelete({
      _id,
    });

    if (!fixture) {
      throw new CustomError(HTTPStatus.NOT_FOUND, 'Fixture not found');
    }
    return fixture;
  }
}

module.exports = UpdateFixtureService;
