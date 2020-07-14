const User = require('../../models/user');

class AuthenticateUserService {
  constructor(loginDetails) {
    this.userLogin = loginDetails;
  }

  async checkIfUserExistAndPasswordIsCorrect() {
    const user = await User.findByCredentials(
      this.userLogin.email,
      this.userLogin.password,
    );

    return user;
  }

  async authenticateUser() {
    return this.checkIfUserExistAndPasswordIsCorrect();
  }
}

module.exports = AuthenticateUserService;
