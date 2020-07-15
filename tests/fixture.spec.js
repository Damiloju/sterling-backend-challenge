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
  fixtureOneID,
} = require('./fixtures/db');

/* eslint-disable no-undef */
beforeEach(setUpDatabase);

describe('Fixture Creation', () => {
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
      .post('/api/v1/fixtures')
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
      .post('/api/v1/fixtures')
      .send({
        homeTeam: teamOneID,
        awayTeam: teamOneID,
        teamStadium: teamOneID,
        date: '2020-07-15T11:19:56.307Z',
      })
      .expect(401);
  });
});

describe('Fetching Fixtures', () => {
  test('should fetch all fixtures for an authenticated user', async () => {
    const response = await request(app)
      .get('/api/v1/fixtures')
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200);

    // eslint-disable-next-line no-underscore-dangle
    const fixtures = response.body.fixtures.data;
    expect(fixtures).not.toBeNull();

    expect(fixtures.length).toBe(1);
  });

  test('should not fetch all fixtures for an unauthenticated user', async () => {
    await request(app).get('/api/v1/fixtures').expect(401);
  });

  test('should fetch a fixture with a given id for an authenticated user', async () => {
    const response = await request(app)
      .get(`/api/v1/fixtures/${fixtureOneID}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200);

    const fixtures = response.body.team;
    expect(fixtures).not.toBeNull();

    expect(response.body).toMatchObject({
      fixture: {
        homeTeamScore: null,
        awayTeamScore: null,
        status: 'pending',
      },
    });
  });
});

describe('Fixture Update and Deletion', () => {
  test('should update a fixture with a given id for an authenticated user', async () => {
    const response = await request(app)
      .patch(`/api/v1/fixtures/${fixtureOneID}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        status: 'completed',
        homeTeamScore: 3,
        awayTeamScore: 3,
      })
      .expect(200);

    const fixture = await Fixture.findById(fixtureOneID);
    expect(fixture).not.toBeNull();

    expect(response.body).toMatchObject({
      fixture: {
        status: 'completed',
        homeTeamScore: 3,
        awayTeamScore: 3,
      },
    });
  });
  test('should not update a fixture with disallowed fields for an authenticated user', async () => {
    await request(app)
      .patch(`/api/v1/fixtures/${fixtureOneID}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .send({
        createdAt: new Date(),
      })
      .expect(400);
  });

  test("should not update a fixture for a user who's not an administrator", async () => {
    await request(app)
      .patch(`/api/v1/fixtures/${fixtureOneID}`)
      .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
      .send({
        name: 'dongun',
      })
      .expect(401);
  });

  test('should delete a fixture with a given id for an authenticated user', async () => {
    await request(app)
      .delete(`/api/v1/fixtures/${fixtureOneID}`)
      .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
      .expect(200);

    const fixture = await Fixture.findById(fixtureOneID);
    expect(fixture).toBeNull();
  });

  test('should not delete a fixture for an unauthenticated user', async () => {
    await request(app).delete(`/api/v1/fixtures/${fixtureOneID}`).expect(401);

    const fixture = await Fixture.findById(fixtureOneID);
    expect(fixture).not.toBeNull();
  });
});
