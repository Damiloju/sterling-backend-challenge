const Fixture = require('../../models/fixture');

class SearchFixturesService {
  constructor(query) {
    this.query = query;
  }

  async searchFixtures() {
    const homeTeam = this.query.homeTeam || '';
    const awayTeam = this.query.awayTeam || '';
    const teamStadium = this.query.teamStadium || '';
    const status = this.query.status || '';

    let results = await Fixture.find({
      $and: [{ status: { $regex: `.*${status}.*`, $options: 'i' } }],
    })
      .populate({
        path: 'homeTeam',
        match: { name: { $regex: `.*${homeTeam}.*`, $options: 'i' } },
        select: 'name',
      })
      .populate({
        path: 'awayTeam',
        match: { name: { $regex: `.*${awayTeam}.*`, $options: 'i' } },
        select: 'name',
      })
      .populate({
        path: 'teamStadium',
        match: { stadium: { $regex: `.*${teamStadium}.*`, $options: 'i' } },
        select: 'name stadium',
      });

    if (this.homeTeam !== '') {
      results = results.filter((result) => {
        if (result.homeTeam) {
          return result;
        }

        return false;
      });
    }

    if (this.awayTeam !== '') {
      results = results.filter((result) => {
        if (result.awayTeam) {
          return result;
        }

        return false;
      });
    }

    if (this.teamStadium !== '') {
      results = results.filter((result) => {
        if (result.teamStadium) {
          return result;
        }

        return false;
      });
    }
    return results;
  }
}

module.exports = SearchFixturesService;
