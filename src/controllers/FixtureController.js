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

FixtureController.getAllCompletedFixtures = async (req, res) => {
  try {
    await fixtureSchemas.fetchFixturesSchema.validate(req.query);

    const fetchFixtureService = new fixtureServices.FetchFixtureService(
      req.query,
      { status: 'completed' },
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

FixtureController.getAllPendingFixtures = async (req, res) => {
  try {
    await fixtureSchemas.fetchFixturesSchema.validate(req.query);

    const fetchFixtureService = new fixtureServices.FetchFixtureService(
      req.query,
      { status: 'pending' },
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

FixtureController.editFixture = async (req, res) => {
  try {
    await fixtureSchemas.editFixtureSchema.validate(req.body);

    const fetchFixtureService = new fixtureServices.FetchFixtureService(
      req.params,
    );

    const fixture = await fetchFixtureService.fetchFixture();

    const updateFixtureService = new fixtureServices.UpdateFixtureService(
      req.body,
      fixture,
    );

    const updatedFixture = await updateFixtureService.updateFixtureRecords();

    return RESPONSEMANAGER.success(
      res,
      HTTPStatus.OK,
      'Fixture updated successfully',
      { fixture: updatedFixture },
    );
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

FixtureController.deleteFixture = async (req, res) => {
  try {
    const updateFixtureService = new fixtureServices.UpdateFixtureService(
      req.params,
    );

    const deletededFixture = await updateFixtureService.deleteFixture();

    return RESPONSEMANAGER.success(
      res,
      HTTPStatus.OK,
      'Fixture deleted successfully',
      { fixture: deletededFixture },
    );
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

FixtureController.searchFixtures = async (req, res) => {
  try {
    await fixtureSchemas.searchFixtureSchema.validate(req.query);

    const searchFixtureServices = new fixtureServices.SearchFixtureService(
      req.query,
    );

    const fixtures = await searchFixtureServices.searchFixtures();

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

module.exports = FixtureController;
