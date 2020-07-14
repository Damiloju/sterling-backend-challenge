/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../src/app');

describe('Test the root path', () => {
  test('should respond with a 404 for root path', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});

describe('Test the api root path', () => {
  test('should respond to the GET method', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.statusCode).toBe(200);
  });
});
