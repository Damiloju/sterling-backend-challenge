const userSchemas = require('../schemas/userSchema');
const userServices = require('../services/UserServices');
const HTTPStatus = require('../lib/utils/httpStatus');

const UserController = {};

UserController.createUser = async (req, res) => {
  try {
    await userSchemas.createUserSchema.validate(req.body);

    const userService = new userServices.CreateUserService(req.body);

    const registeredUser = await userService.createNewUser();
    const token = registeredUser.generateAuthToken();

    return res.status(HTTPStatus.CREATED).json({
      message: 'Account was created successfully',
      user: registeredUser,
      token,
    });
  } catch (err) {
    if (err.statusCode) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(HTTPStatus.BAD_REQUEST).json({ error: err.message });
  }
};

module.exports = UserController;
