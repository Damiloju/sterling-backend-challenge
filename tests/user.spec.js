const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { setUpDatabase, userOne, userOneID } = require('./fixtures/db');

/* eslint-disable no-undef */
beforeEach(setUpDatabase);

describe('User SignUp', () => {
  test('should signup a new user', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({
        username: 'dongun',
        email: 'dami@example.com',
        password: 'Mypass1020',
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body).toMatchObject({
      user: {
        username: 'dongun',
        email: 'dami@example.com',
      },
    });
  });

  test('should not signup a new user with invalid email', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        username: 'don',
        email: 'dami',
        password: 'Mypass1020',
      })
      .expect(400);

    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findOne({ username: 'don' });
    expect(user).toBeNull();
  });

  test('should not signup a new user with invalid username', async () => {
    await request(app)
      .post('/api/v1/users')
      .send({
        username: 'do',
        email: 'dami@dami.com',
        password: 'Mypass1020',
      })
      .expect(400);

    // eslint-disable-next-line no-underscore-dangle
    const user = await User.findOne({ username: 'do' });
    expect(user).toBeNull();
  });
});

describe('User Authentication', () => {
  test('should login existing user', async () => {
    const response = await request(app)
      .post('/api/v1/users/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    const user = await User.findById(userOneID);

    expect(response.body.token).toBe(user.tokens[1].token);
  });

  test('should not log in nonexistent user', async () => {
    await request(app)
      .post('/api/v1/users/login')
      .send({
        email: 'user@example.com',
        password: userOne.password,
      })
      .expect(400);
  });
});
