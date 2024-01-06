const {
  mongoIdRule,
  roleUserName,
  roleUserEmail,
  roleUserPhone,
  roleUserPassword,
  roleUserPasswordConfirm,
  roleUserProfileImg,
  roleUserRole,
} = require("../manager/rules/user");
const {validatorMiddleware} = require("../../../core/middlewares/validatorMiddleware");
const {uploadSingle} = require("../../../core/middlewares/uploadFileMiddleware");
const {body} = require("express-validator");
const User = require("../data/models/userModel");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");


const uploadUserImage = uploadSingle('users')

exports.showUserMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveUserMiddleware = [
  uploadUserImage,
  roleUserName,
  roleUserEmail,
  roleUserPhone,
  roleUserPassword,
  roleUserPasswordConfirm,
  roleUserProfileImg,
  roleUserRole,
  validatorMiddleware,
];

exports.updateBrandMiddleware = [
  mongoIdRule,
  roleUserName,
  roleUserEmail,
  roleUserPhone,
  roleUserPassword,
  roleUserProfileImg,
  roleUserRole,
  validatorMiddleware,
];
exports.deleteBrandMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];


exports.changeUserPasswordValidator = [
  mongoIdRule,
  body('currentPassword')
    .notEmpty()
    .withMessage('You must enter your current password'),
  body('passwordConfirm')
    .notEmpty()
    .withMessage('You must enter the password confirm'),
  body('password')
    .notEmpty()
    .withMessage('You must enter new password')
    .custom(async (val, {req}) => {
      // 1) Verify current password
      const user = await User.findById(req.params.id);
      if (!user) {
        throw new Error('There is no user for this id');
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error('Incorrect current password');
      }

      // 2) Verify password confirm
      if (val !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),
  validatorMiddleware,
];


exports.updateLoggedUserValidator = [
  roleUserName,
  roleUserEmail,
  roleUserPhone,
  validatorMiddleware,
];