const request = require('supertest');
const app = require('../src/app');
const Team = require('../src/models/team');
const {
  setUpDatabase,
  userOne,
  userTwo,
  teamOne,
  teamOneID,
} = require('./fixtures/db');

/* eslint-disable no-undef */
beforeEach(setUpDatabase);

describe('Team Creation', () => {
  test('should create a new team for an authenticated user', async () => {
    const response = await request(app)
      .post('/api/v1/teams')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        name: 'dongun',
        stadium: 'dami.com',
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    const team = await Team.findById(response.body.team._id);
    expect(team).not.toBeNull();

    expect(response.body).toMatchObject({
      team: {
        name: 'dongun',
        stadium: 'dami.com',
      },
    });
  });

  test("should not create a new team for an authenticated user that's not and administrator", async () => {
    const response = await request(app)
      .post('/api/v1/teams')
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send({
        name: 'dmoemie',
        stadium: 'doeoeo',
      })
      .expect(401);

    // eslint-disable-next-line no-underscore-dangle
    const team = await Team.findById(response.body.team);
    expect(team).toBeNull();
  });

  test('should not create a new team for an unauthenticated user', async () => {
    const response = await request(app)
      .post('/api/v1/teams')
      .send({
        name: 'dmoemie',
        stadium: 'doeoeo',
      })
      .expect(401);

    // eslint-disable-next-line no-underscore-dangle
    const team = await Team.findById(response.body.team);
    expect(team).toBeNull();
  });
});

describe('Fetching Teams', () => {
  test('should fetch all teams for an authenticated user', async () => {
    const response = await request(app)
      .get('/api/v1/teams')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200);

    // eslint-disable-next-line no-underscore-dangle
    const teams = response.body.teams.data;
    expect(teams).not.toBeNull();

    expect(teams.length).toBe(1);
  });

  test('should not fetch all teams for an unauthenticated user', async () => {
    await request(app).get('/api/v1/teams').expect(401);
  });

  test('should fetch all team with a given id for an unauthenticated user', async () => {
    const response = await request(app)
      .get(`/api/v1/teams/${teamOneID}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200);

    const teams = response.body.team;
    expect(teams).not.toBeNull();

    expect(response.body).toMatchObject({
      team: {
        name: teamOne.name,
        stadium: teamOne.stadium,
      },
    });
  });
});
