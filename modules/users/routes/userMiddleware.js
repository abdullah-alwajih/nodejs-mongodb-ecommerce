const {
  mongoIdRule,
  roleUserName,
  roleUserEmail,
  roleUserPhone,
  roleUserPassword,
  roleUserPasswordConfirm,
  roleUserProfileImg,
  roleUserRole, roleUserEmailLogin, roleUserCurrentPassword,
} = require("../manager/validators/user");

const {validatorMiddleware} = require("../../../core/middlewares/validatorMiddleware");
const {uploadSingle} = require("../../../core/middlewares/uploadFileMiddleware");
const {body, check} = require("express-validator");
const User = require("../data/models/userModel");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");


const uploadUserImage = uploadSingle('users')

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

exports.updateUserMiddleware = [
  mongoIdRule,
  roleUserName,
  roleUserEmail,
  roleUserPhone,
  roleUserPassword,
  roleUserProfileImg,
  roleUserRole,
  validatorMiddleware,
];
exports.deleteUserMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];


exports.changeUserPasswordValidator = [
  mongoIdRule,
  roleUserPassword,
  roleUserPasswordConfirm,
  roleUserCurrentPassword,
  validatorMiddleware,
];


exports.updateLoggedUserValidator = [
  roleUserName,
  roleUserEmail,
  roleUserPhone,
  validatorMiddleware,
];


exports.createUserValidator = [
  uploadUserImage,
  roleUserName,
  roleUserEmail,
  roleUserPassword,
  roleUserPasswordConfirm,
  roleUserPhone,
  roleUserProfileImg,
  roleUserRole,
  validatorMiddleware,
];

exports.getUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  uploadUserImage,

  body('name')
    .optional()
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({email: val}).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),
  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

  check('profileImg').optional(),
  check('role').optional(),
  validatorMiddleware,
];


exports.deleteUserValidator = [
  check('id').isMongoId().withMessage('Invalid User id format'),
  validatorMiddleware,
];

exports.updateLoggedUserValidator = [
  body('name')
    .optional()
    .custom((val, {req}) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({email: val}).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),
  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

  validatorMiddleware,
];
