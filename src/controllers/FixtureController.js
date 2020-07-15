const fixtureSchemas = require('../schemas/fixtureSchema');
const fixtureServices = require('../services/FixtureServices');
const HTTPStatus = require('../lib/utils/httpStatus');
const RESPONSEMANAGER = require('../lib/response_manager');

const FixtureController = {};

FixtureController.createFixture = async (req, res) => {
  try {
    await fixtureSchemas.createFixtureSchema.validate(req.body);

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

module.exports = FixtureController;
