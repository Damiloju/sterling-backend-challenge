const User = require('../../models/user');

class CreateUserService {
  constructor(userData) {
    this.userData = userData;
  }

  async checkIfEmailExists() {
    const user = await User.findOne({ email: this.userData.email });
    if (user) {
      throw new Error('A user with this email has been registered');
    }
  }

  async storeUserDetails() {
    const user = await new User(this.userData);

    await user.save();

    return user;
  }

  // Register a new user
  async createNewUser() {
    await this.checkIfEmailExists();
    const user = await this.storeUserDetails();

    return user;
  }
}
module.exports = CreateUserService;
