const User = require('../../models/user');

class AuthenticateUserService {
  constructor(loginDetails, user = {}, token = '') {
    this.userLogin = loginDetails;
    this.user = user;
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

  async logUserOut() {
    this.user.tokens = this.user.tokens.filter(
      (token) => token.token !== this.token,
    );

    await this.user.save();
  }

  async logAllUserSessionsOut() {
    this.user.tokens = [];

    await this.user.save();
  }
}

module.exports = AuthenticateUserService;
