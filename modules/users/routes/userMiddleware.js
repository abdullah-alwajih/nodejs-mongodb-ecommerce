const {
  roleUserName,
  roleUserEmail,
  roleUserPhone,
  roleUserPassword,
  roleUserPasswordConfirm,
  roleUserProfileImg,
  roleUserRole, roleUserEmailLogin, roleUserCurrentPassword,
} = require("../manager/validators/user");

const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");
const {uploadSingle} = require("../../../core/middlewares/uploadFileMiddleware");
const {body, check} = require("express-validator");
const User = require("../data/models/userModel");
const slugify = require("slugify");
const {mongoIdRule} = require("../../../core/validators/mongoIdRule");


const uploadUserImage = uploadSingle('users', 'image', {width: 600, height: 600})


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
