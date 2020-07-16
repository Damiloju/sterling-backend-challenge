// const app = require('../../src/app');
require('../../src/db/mongoose');
const userServices = require('../../src/services/UserServices');
const authServices = require('../../src/services/AuthServices');
const { setUpDatabase, userOne } = require('../fixtures/db');

/* eslint-disable no-undef */
beforeEach(setUpDatabase);

describe('User Services', () => {
  describe('User Creation Service', () => {
    let createUserService;
    const userData = {
      username: 'dongun3',
      email: 'test@teting.com',
      password: 'password',
    };
    beforeEach(() => {
      createUserService = new userServices.CreateUserService(userData);
    });
    test('should store the user details in the db', async () => {
      const user = await createUserService.storeUserDetails();
      expect(user).not.toBeNull();
      expect(user).toMatchObject({
        username: userData.username,
        email: userData.email,
        is_admin: false,
      });
    });

    test('should throw an error if the user email has been registered', async () => {
      const newUserData = { ...userData };
      newUserData.email = userOne.email;
      createUserService = new userServices.CreateUserService(newUserData);
      expect(createUserService.checkIfEmailExists()).rejects.toThrowError(
        new Error('A user with this email has been registered'),
      );
    });

    test('should create a new user', async () => {
      const user = await createUserService.createNewUser();
      expect(user).not.toBeNull();
      expect(user).toMatchObject({
        username: userData.username,
        email: userData.email,
        is_admin: false,
      });
    });
  });

  describe('Authentication Service', () => {
    let authenticateUserService;
    const userData = {
      email: userOne.email,
      password: userOne.password,
    };
    beforeEach(() => {
      authenticateUserService = new authServices.AuthenticateUserService(
        userData,
      );
    });
    test('should find and generate token for valid user details', async () => {
      const user = await authenticateUserService.authenticateUser();
      expect(user).not.toBeNull();
      expect(user.tokens.length).toBeGreaterThan(0);
      expect(user).toMatchObject({
        email: userData.email,
        is_admin: true,
      });
    });

    test('should throw an error for invalid user details', async () => {
      authenticateUserService = new authServices.AuthenticateUserService({
        email: 'testing@email',
        password: 'password',
      });
      expect(authenticateUserService.authenticateUser()).rejects.toThrowError();
    });
  });
});
