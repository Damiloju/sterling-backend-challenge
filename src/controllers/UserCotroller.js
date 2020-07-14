const userSchemas = require('../schemas/userSchema');
const userServices = require('../services/UserServices');
const HTTPStatus = require('../lib/utils/httpStatus');
const RESPONSEMANAGER = require('../lib/response_manager');

const UserController = {};

UserController.createUser = async (req, res) => {
  try {
    await userSchemas.createUserSchema.validate(req.body);

    const userService = new userServices.CreateUserService(req.body);

    const registeredUser = await userService.createNewUser();
    const token = await registeredUser.generateAuthToken();

    return RESPONSEMANAGER.success(
      res,
      HTTPStatus.CREATED,
      'Account was created successfully',
      { user: registeredUser, token },
    );
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

module.exports = UserController;
