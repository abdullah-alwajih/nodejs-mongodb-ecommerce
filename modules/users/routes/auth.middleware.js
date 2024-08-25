const {
  validateUserName,
  validateUserEmail,
  validateUserPassword,
  validateUserPasswordConfirm,
  validateUserEmailLogin,
} = require("../manager/validators/user.validator");

const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");


exports.signupValidator = [
  validateUserName,
  validateUserEmail,
  validateUserPassword,
  validateUserPasswordConfirm,
  validatorMiddleware,
];

exports.loginValidator = [
  validateUserEmailLogin,
  validateUserPassword,
  validatorMiddleware,
];


