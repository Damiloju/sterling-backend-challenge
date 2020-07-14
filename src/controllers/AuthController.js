const authSchemas = require('../schemas/authSchema');
const authServices = require('../services/AuthServices');

const HTTPStatus = require('../lib/utils/httpStatus');
const RESPONSEMANAGER = require('../lib/response_manager');

const AuthController = {};

AuthController.authenticateUser = async (req, res) => {
  try {
    await authSchemas.authenticateUserSchema.validate(req.body);
    const authService = new authServices.AuthenticateUserService(req.body);

    const user = await authService.authenticateUser();
    const token = await user.generateAuthToken();

    return RESPONSEMANAGER.success(res, HTTPStatus.OK, 'Login successful', {
      user,
      token,
    });
  } catch (err) {
    return RESPONSEMANAGER.error(res, HTTPStatus.BAD_REQUEST, err);
  }
};

module.exports = AuthController;
