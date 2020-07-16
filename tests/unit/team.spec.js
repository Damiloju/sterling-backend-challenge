/* eslint-disable no-underscore-dangle */
// const app = require('../../src/app');
require('../../src/db/mongoose');
const teamServices = require('../../src/services/TeamServices');
const {
  setUpDatabase,
  teamOneID,
  teamOne,
  userOneID,
} = require('../fixtures/db');

/* eslint-disable no-undef */
beforeEach(setUpDatabase);

describe('Team Services', () => {
  describe('Create Team Service', () => {
    let createTeamService;
    const teamData = {
      name: 'Manchester United',
      stadium: 'Old Trafford',
    };
    beforeEach(() => {
      createTeamService = new teamServices.CreateTeamService(teamData);
    });
    test('should create a new team', async () => {
      const team = await createTeamService.createNewTeam();
      expect(team).not.toBeNull();
      expect(team).toMatchObject({
        name: teamData.name,
        stadium: teamData.stadium,
      });
    });

    test('should not create a new team with invalid data', async () => {
      const testData = {
        name: 'Manchester United',
        stadium: {},
      };
      createTeamService = new teamServices.CreateTeamService(testData);
      expect(createTeamService.createNewTeam()).rejects.toThrowError();
    });
  });

  describe('Fetch Team Service', () => {
    let fetchTeamService;
    const data = {
      id: teamOneID,
    };
    beforeEach(() => {
      fetchTeamService = new teamServices.FetchTeamService(data);
    });
    test('should fetch a valid team', async () => {
      const team = await fetchTeamService.fetchTeam();
      expect(team).not.toBeNull();
      expect(team).toMatchObject({
        name: teamOne.name,
        stadium: teamOne.stadium,
        _id: teamOne._id,
      });
    });

    test('should fetch all teams', async () => {
      const teams = await fetchTeamService.fetchAllTeams();
      expect(teams).not.toBeNull();
      expect(teams).toMatchObject({ data: [{}] });
    });

    test('should throw an error for a team that those not exists', async () => {
      const newData = { id: userOneID };
      fetchTeamService = new teamServices.FetchTeamService(newData);
      expect(fetchTeamService.fetchTeam()).rejects.toThrowError();
    });
  });

  describe('Search Teams Service', () => {
    test('should return a team with the given name', async () => {
      const data = {
        name: teamOne.name,
      };

      const SearchTeamService = new teamServices.SearchTeamService(data);
      const teams = await SearchTeamService.searchTeams();
      expect(teams).not.toBeNull();
      expect(teams[0].name).toBe(teamOne.name);
    });

    test('should return a team with the given stadium', async () => {
      const data = {
        stadium: teamOne.stadium,
      };

      const SearchTeamService = new teamServices.SearchTeamService(data);
      const teams = await SearchTeamService.searchTeams();
      expect(teams).not.toBeNull();
      expect(teams[0].stadium).toBe(teamOne.stadium);
    });

    test('should return an empty array for non existent team', async () => {
      const data = {
        name: 'Oluwadamiloju',
      };

      const SearchTeamService = new teamServices.SearchTeamService(data);
      const teams = await SearchTeamService.searchTeams();
      expect(teams).not.toBeNull();
      expect(teams.length).toBe(0);
    });
  });

  describe('Update Team Service', () => {
    describe('Update Team', () => {
      test('should throw an error for a field that is not allowed to be updated', async () => {
        const data = {
          createdAt: new Date(),
        };

        const updateTeamService = new teamServices.UpdateTeamService(
          data,
          teamOne,
        );
        expect(updateTeamService.updateTeamRecords()).rejects.toThrowError();
      });

      test('should throw an error if a team is not provided', async () => {
        const data = {
          createdAt: new Date(),
        };

        const updateTeamService = new teamServices.UpdateTeamService(data);
        expect(updateTeamService.updateTeamRecords()).rejects.toThrowError();
      });
    });

    describe('Delete', () => {
      test('should delete a team with the provided ID', async () => {
        const data = {
          id: teamOneID,
        };

        const updateTeamService = new teamServices.UpdateTeamService(data);

        const team = await updateTeamService.deleteTeam();
        expect(team).not.toBeNull();
      });

      test('should throw an error for an invalid team', async () => {
        const data = {
          id: userOneID,
        };

        const updateTeamService = new teamServices.UpdateTeamService(data);
        expect(updateTeamService.deleteTeam()).rejects.toThrowError();
      });
    });
  });
});
