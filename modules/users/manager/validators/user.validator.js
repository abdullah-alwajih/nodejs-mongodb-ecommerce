const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const {body, param, check} = require('express-validator');
const User = require('../../data/models/user.model');


exports.validateUserName = body('name')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.user_name_required'))
  .isLength({min: 3})
  .withMessage((value, {req}) => req.__('validation.user_name_too_short'))
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });

exports.validateUserEmail = body('email')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.email_required'))
  .isEmail()
  .withMessage((value, {req}) => req.__('validation.invalid_email'))
  .custom(async (val, {req}) => {
    const user = await User.findOne({email: val});
    if (user) {
      throw new Error(req.__('validation.email_already_in_use'));
    }
    return true;
  });


exports.validateUserEmailLogin = check('email')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.email_required'))
  .isEmail()
  .withMessage((value, {req}) => req.__('validation.invalid_email'));


exports.validateUserPassword = body('password')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.password_required'))
  .isLength({min: 6})
  .withMessage((value, {req}) => req.__('validation.password_too_short'));

exports.validateUserPasswordConfirm = body('passwordConfirm')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.password_confirmation_required'))
  .custom((passwordConfirm, {req}) => {
    if (passwordConfirm !== req.body.password) {
      throw new Error(req.__('validation.password_confirmation_incorrect'));
    }
    return true;
  });

exports.validateUserCurrentPassword = body('currentPassword')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.current_password_required'))
  .custom(async (val, {req}) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error(req.__('validation.no_user_found_for_id'));
    }
    const isCorrectPassword = await bcrypt.compare(req.body.currentPassword, user.password);
    if (!isCorrectPassword) {
      throw new Error(req.__('validation.incorrect_current_password'));
    }
    return true;
  });


exports.validateUserPhone = body('phone')
  .optional()
  .isMobilePhone(['ar-EG', 'ar-SA'])
  .withMessage((value, {req}) => req.__('validation.invalid_phone_number'));

exports.validateUserProfileImg = body('profileImg').optional()

exports.validateUserRole = body('role').optional()
