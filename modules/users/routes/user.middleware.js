const {
  validateUserName,
  validateUserEmail,
  validateUserPhone,
  validateUserPassword,
  validateUserPasswordConfirm,
  validateUserProfileImg,
  validateUserRole, validateUserCurrentPassword,
} = require("../manager/validators/user.validator");

const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");
const {uploadSingle} = require("../../../core/middlewares/uploadFileMiddleware");
const {mongoIdRule} = require("../../../core/validators/mongoIdRule");


const uploadUserImage = uploadSingle('users', 'image', {width: 600, height: 600})


exports.showUserMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveUserMiddleware = [
  uploadUserImage,
  validateUserName,
  validateUserEmail,
  validateUserPhone,
  validateUserPassword,
  validateUserPasswordConfirm,
  validateUserProfileImg,
  validateUserRole,
  validatorMiddleware,
];

exports.deleteUserMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];


exports.changeUserPasswordMiddleware = [
  mongoIdRule,
  validateUserPassword,
  validateUserPasswordConfirm,
  validateUserCurrentPassword,
  validatorMiddleware,
];


exports.updateLoggedUserMiddleware = [
  validateUserName,
  validateUserEmail,
  validateUserPhone,
  validatorMiddleware,
];


exports.createUserMiddleware = [
  uploadUserImage,
  validateUserName,
  validateUserEmail,
  validateUserPassword,
  validateUserPasswordConfirm,
  validateUserPhone,
  validateUserProfileImg,
  validateUserRole,
  validatorMiddleware,
];

exports.updateUserMiddleware = [
  mongoIdRule,
  validateUserName,
  validateUserEmail,
  validateUserPhone,
  validateUserPassword,
  validateUserProfileImg,
  validateUserRole,
  validatorMiddleware,
];


