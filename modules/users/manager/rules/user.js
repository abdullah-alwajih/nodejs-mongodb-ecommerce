const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const {body, param} = require('express-validator');
const User = require('../../data/models/userModel');


exports.mongoIdRule = param('id').isMongoId().withMessage('Invalid brand id format');

exports.roleUserName = body('name')
  .notEmpty()
  .withMessage('User required')
  .isLength({min: 3})
  .withMessage('Too short User name')
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });

exports.roleUserEmail = body('email')
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
  )

exports.roleUserPassword = body('password')
  .notEmpty()
  .withMessage('Password required')
  .isLength({min: 6})
  .withMessage('Password must be at least 6 characters')
  .custom((password, {req}) => {
    if (password !== req.body.passwordConfirm) {
      throw new Error('Password Confirmation incorrect');
    }
    return true;
  })

exports.roleUserPasswordConfirm = body('passwordConfirm')
  .notEmpty()
  .withMessage('Password confirmation required')

exports.roleUserPhone = body('phone')
  .optional()
  .isMobilePhone(['ar-EG', 'ar-SA'])
  .withMessage('Invalid phone number only accepted Egy and SA Phone numbers')

exports.roleUserProfileImg = body('profileImg').optional()

exports.roleUserRole = body('role').optional()
