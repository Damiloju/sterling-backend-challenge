const Fixture = require('../../models/fixture');
const CustomError = require('../../lib/Helpers/CustomError');
const HTTPStatus = require('../../lib/utils/httpStatus');

class FetchFixtureService {
  constructor(resquestQuery, query = {}) {
    this.resquestQuery = resquestQuery;
    this.query = query;
  }

  async fetchAllFixtures() {
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
      const fixtures = await Fixture.paginate(this.query, {
        sort,
        page,
        limit,
        pagination,
        customLabels: myCustomLabels,
      });
      return fixtures;
    } catch (error) {
      throw new Error(error);
    }
  }

  async fetchFixture() {
    const { id } = this.resquestQuery;
    const fixture = await Fixture.findOne({
      _id: id,
    })
      .populate({ path: 'homeTeam', select: 'name' })
      .populate({ path: 'awayTeam', select: 'name' })
      .populate({ path: 'teamStadium', select: 'stadium' })
      .cache();
    if (!fixture) {
      throw new CustomError(HTTPStatus.NOT_FOUND, 'Fixture not found');
    }
    return fixture;
  }
}

module.exports = FetchFixtureService;
