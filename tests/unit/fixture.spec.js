/* eslint-disable no-underscore-dangle */
// const app = require('../../src/app');
require('../../src/db/mongoose');
const fixtureServices = require('../../src/services/FixtureServices');
const {
  setUpDatabase,
  teamOneID,
  fixtureOneID,
  teamOne,
} = require('../fixtures/db');

/* eslint-disable no-undef */
beforeEach(setUpDatabase);

describe('Fixture Services', () => {
  describe('Create Fixture Service', () => {
    let createFixtureService;
    const fixtureData = {
      homeTeam: teamOneID,
      awayTeam: teamOneID,
      teamStadium: teamOneID,
      date: new Date(),
    };

    beforeEach(() => {
      createFixtureService = new fixtureServices.CreateFixtureService(
        fixtureData,
      );
    });
    test('should create a new fixture', async () => {
      const fixture = await createFixtureService.storeFixtureDetails();
      expect(fixture).not.toBeNull();
      expect(fixture).toMatchObject({
        homeTeamScore: null,
        awayTeamScore: null,
        homeTeam: teamOneID,
        awayTeam: teamOneID,
        teamStadium: teamOneID,
      });
    });

    test('should not create a new fixture with invalid data', async () => {
      const testData = {
        name: 'Manchester United',
        stadium: {},
      };
      createFixtureService = new fixtureServices.CreateFixtureService(testData);
      expect(createFixtureService.storeFixtureDetails()).rejects.toThrowError();
    });
  });

  describe('Fetch Fixture Service', () => {
    let fetchFixtureService;
    const data = {
      id: fixtureOneID,
    };
    beforeEach(() => {
      fetchFixtureService = new fixtureServices.FetchFixtureService(data);
    });
    test('should fetch a valid fixture', async () => {
      const fixture = await fetchFixtureService.fetchFixture();
      expect(fixture).not.toBeNull();
      expect(fixture).toMatchObject({
        homeTeam: { name: teamOne.name },
        awayTeam: { name: teamOne.name },
        _id: fixtureOneID,
      });
    });

    test('should fetch all fixtures', async () => {
      const fixtures = await fetchFixtureService.fetchAllFixtures();
      expect(fixtures).not.toBeNull();
      expect(fixtures).toMatchObject({ data: [{}] });
    });

    test('should throw an error for a fixture that those not exists', async () => {
      const newData = { id: teamOneID };
      fetchFixtureService = new fixtureServices.FetchFixtureService(newData);
      expect(fetchFixtureService.fetchFixture()).rejects.toThrowError();
    });
  });

  describe('Update fixture Service', () => {
    describe('Update Fixture', () => {
      test('should throw an error for a field that is not allowed to be updated', async () => {
        const data = {
          createdAt: new Date(),
        };

        const updateFixtureService = new fixtureServices.UpdateFixtureService(
          data,
        );

        expect(
          updateFixtureService.updateFixtureRecords(),
        ).rejects.toThrowError();
      });

      test('should throw an error if a fixture is not provided', async () => {
        const data = {
          homeTeamScore: 9,
        };

        const updateFixtureService = new fixtureServices.UpdateFixtureService(
          data,
        );
        expect(
          updateFixtureService.updateFixtureRecords(),
        ).rejects.toThrowError();
      });
    });

    describe('Delete', () => {
      test('should delete a fixture with the provided ID', async () => {
        const data = {
          id: fixtureOneID,
        };

        const updateFixtureService = new fixtureServices.UpdateFixtureService(
          data,
        );

        const fixture = await updateFixtureService.deleteFixture();
        expect(fixture).not.toBeNull();
      });

      test('should throw an error for an invalid fixture', async () => {
        const data = {
          id: teamOneID,
        };

        const updateFixtureService = new fixtureServices.UpdateFixtureService(
          data,
        );
        expect(updateFixtureService.deleteFixture()).rejects.toThrowError();
      });
    });
  });
});
