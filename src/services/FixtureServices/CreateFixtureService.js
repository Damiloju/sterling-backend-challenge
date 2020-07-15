const Fixture = require('../../models/fixture');
const FetchTeamService = require('../TeamServices/FetchTeamsService');

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
    await homeTeam.fixtures.push(fixture._id);
    // eslint-disable-next-line no-underscore-dangle
    await awayTeam.fixtures.push(fixture._id);

    await homeTeam.save();
    await awayTeam.save();
  }

  // Register a new fixture
  async createNewFixture() {
    const fixture = await this.storeFixtureDetails();

    try {
      await this.addFixtureToTeams(fixture);
      return {
        data: fixture,
        error: false,
      };
    } catch (error) {
      return {
        data: fixture,
        error:
          'Fixture created successfully, but it could not be added to the teams fixtures list',
      };
    }
  }
}
module.exports = CreateFixtureService;
