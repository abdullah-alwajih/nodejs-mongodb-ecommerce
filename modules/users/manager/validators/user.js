const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const {body, param, check} = require('express-validator');
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
  })

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


exports.roleUserEmailLogin = check('email')
  .notEmpty()
  .withMessage('Email required')
  .isEmail()
  .withMessage('Invalid email address')


exports.roleUserPassword = body('password')
  .notEmpty()
  .withMessage('Password required')
  .isLength({min: 6})
  .withMessage('Password must be at least 6 characters')

exports.roleUserPasswordConfirm = body('passwordConfirm')
  .notEmpty().withMessage('Password confirmation required')
  .custom((passwordConfirm, {req}) => {
    if (passwordConfirm !== req.body.password) {
      throw new Error('Password Confirmation incorrect');
    }
    return true;
  })

exports.roleUserCurrentPassword = body('currentPassword')
  .notEmpty()
  .withMessage('You must enter your current password')
  .custom(async (val, {req}) => {
    // 1) Verify current password
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error('There is no user for this id');
    }
    const isCorrectPassword = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isCorrectPassword) {
      throw new Error('Incorrect current password');
    }
    return true;
  })


exports.roleUserPhone = body('phone')
  .optional()
  .isMobilePhone(['ar-EG', 'ar-SA'])
  .withMessage('Invalid phone number only accepted Egy and SA Phone numbers')

exports.roleUserProfileImg = body('profileImg').optional()

exports.roleUserRole = body('role').optional()
