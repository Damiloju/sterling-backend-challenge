const fixtureSchemas = require('../schemas/fixtureSchema');
const fixtureServices = require('../services/FixtureServices');
const HTTPStatus = require('../lib/utils/httpStatus');
const RESPONSEMANAGER = require('../lib/response_manager');

const FixtureController = {};

FixtureController.createFixture = async (req, res) => {
  try {
    await fixtureSchemas.createFIxtureSchema.validate(req.body);

    const fixtureService = new fixtureServices.CreateFixtureService(req.body);

    const registeredFixture = await fixtureService.createNewFixture();

    return RESPONSEMANAGER.success(
      res,
      HTTPStatus.CREATED,
      'Fixture created successfully',
      { fixture: registeredFixture },
    );
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

FixtureController.getAllFixtures = async (req, res) => {
  try {
    await fixtureSchemas.fetchFixturesSchema.validate(req.query);

    const fetchFixtureService = new fixtureServices.FetchFixtureService(
      req.query,
    );

    const fixtures = await fetchFixtureService.fetchAllFixtures();

    return RESPONSEMANAGER.success(
      res,
      HTTPStatus.OK,
      'Fixtures fetched successfully',
      { fixtures },
    );
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

FixtureController.getFixture = async (req, res) => {
  try {
    const fetchFixtureService = new fixtureServices.FetchFixtureService(
      req.params,
    );

    const fixture = await fetchFixtureService.fetchFixture();

    return RESPONSEMANAGER.success(
      res,
      HTTPStatus.OK,
      'Fixture fetched successfully',
      { fixture },
    );
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

module.exports = FixtureController;
