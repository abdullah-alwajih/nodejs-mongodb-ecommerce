const {
  roleUserName,
  roleUserEmail,
  roleUserPassword,
  roleUserPasswordConfirm,
  roleUserEmailLogin,
} = require("../manager/validators/user");

const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");


exports.signupValidator = [
  roleUserName,
  roleUserEmail,
  roleUserPassword,
  roleUserPasswordConfirm,
  validatorMiddleware,
];

exports.loginValidator = [
  roleUserEmailLogin,
  roleUserPassword,
  validatorMiddleware,
];


