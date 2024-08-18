const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const {body, param, check} = require('express-validator');
const User = require('../../data/models/userModel');


exports.mongoIdRule = param('id')
  .isMongoId()
  .withMessage((value, {req}) => req.__('validation.invalid_id_format'));

exports.roleUserName = body('name')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.user_name_required'))
  .isLength({min: 3})
  .withMessage((value, {req}) => req.__('validation.user_name_too_short'))
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });

exports.roleUserEmail = body('email')
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


exports.roleUserEmailLogin = check('email')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.email_required'))
  .isEmail()
  .withMessage((value, {req}) => req.__('validation.invalid_email'));


exports.roleUserPassword = body('password')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.password_required'))
  .isLength({min: 6})
  .withMessage((value, {req}) => req.__('validation.password_too_short'));

exports.roleUserPasswordConfirm = body('passwordConfirm')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.password_confirmation_required'))
  .custom((passwordConfirm, {req}) => {
    if (passwordConfirm !== req.body.password) {
      throw new Error(req.__('validation.password_confirmation_incorrect'));
    }
    return true;
  });

exports.roleUserCurrentPassword = body('currentPassword')
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


exports.roleUserPhone = body('phone')
  .optional()
  .isMobilePhone(['ar-EG', 'ar-SA'])
  .withMessage((value, {req}) => req.__('validation.invalid_phone_number'));

exports.roleUserProfileImg = body('profileImg').optional()

exports.roleUserRole = body('role').optional()
