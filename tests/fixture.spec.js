/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const app = require('../src/app');
const Fixture = require('../src/models/fixture');
const {
  setUpDatabase,
  userOne,
  userTwo,
  teamOneID,
  teamOne,
} = require('./fixtures/db');

/* eslint-disable no-undef */
beforeEach(setUpDatabase);

describe('Team Creation', () => {
  test('should create a new fixture for an authenticated user', async () => {
    const response = await request(app)
      .post('/api/v1/fixtures')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        homeTeam: teamOne._id,
        awayTeam: teamOne._id,
        teamStadium: teamOne._id,
        date: '2020-07-15T11:19:56.307Z',
      })
      .expect(201);

    const fixture = await Fixture.findById(response.body.fixture.data._id);
    expect(fixture).not.toBeNull();
  });

  test('should not create a new fixture for an authenticated user with invalid fields', async () => {
    const response = await request(app)
      .post('/api/v1/fixtures')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        homeTeam: '1233',
        awayTeam: teamOne._id,
        teamStadium: teamOne._id,
        date: '2020-07-15T11:19:56.307Z',
      })
      .expect(400);

    const { fixture } = response.body;
    expect(fixture).toBeUndefined();
  });

  test("should not create a new fixture for an authenticated user that's not and administrator", async () => {
    await request(app)
      .post('/api/v1/teams')
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send({
        homeTeam: teamOneID,
        awayTeam: teamOneID,
        teamStadium: teamOneID,
        date: '2020-07-15T11:19:56.307Z',
      })
      .expect(401);
  });

  test('should not create a new fixture for an unauthenticated user', async () => {
    await request(app)
      .post('/api/v1/teams')
      .send({
        homeTeam: teamOneID,
        awayTeam: teamOneID,
        teamStadium: teamOneID,
        date: '2020-07-15T11:19:56.307Z',
      })
      .expect(401);
  });
});

describe('Fetching Fixtures', () => {});

describe('Fixture Update and Deletion', () => {});
