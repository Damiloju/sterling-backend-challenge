const Fixture = require('../../models/fixture');
const FetchTeamService = require('../TeamServices/FetchTeamsService');
const CustomError = require('../../lib/Helpers/CustomError');
const HTTPStatus = require('../../lib/utils/httpStatus');

class CreateFixtureService {
  constructor(fixtureData) {
    this.fixtureData = fixtureData;
  }

  async storeFixtureDetails() {
    const fixture = await new Fixture(this.fixtureData);

    await fixture.save();

    return fixture;
  }

  // eslint-disable-next-line class-methods-use-this
  async addFixtureToTeams(fixture) {
    const homeTeam = await new FetchTeamService({
      id: fixture.homeTeam,
    }).fetchTeam();
    const awayTeam = await new FetchTeamService({
      id: fixture.awayTeam,
    }).fetchTeam();

    // eslint-disable-next-line no-underscore-dangle
    homeTeam.fixtures = homeTeam.fixtures.concat(fixture._id);
    // eslint-disable-next-line no-underscore-dangle
    awayTeam.fixtures = awayTeam.fixtures.concat(fixture._id);

    await homeTeam.save();
    await awayTeam.save();
  }

  // Register a new fixture
  async createNewFixture() {
    const fixture = await this.storeFixtureDetails();

    try {
      await this.addFixtureToTeams(fixture);
    } catch (error) {
      throw new CustomError(
        HTTPStatus.INTERNAL_SERVER_ERROR,
        'Fixture created successfully, but it could not be added to the teans fixtures list',
      );
    }

    return fixture;
  }
}
module.exports = CreateFixtureService;
