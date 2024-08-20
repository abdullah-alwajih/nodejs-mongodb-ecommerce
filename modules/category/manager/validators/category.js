const {body, param} = require("express-validator");
const slugify = require("slugify");


exports.categoryNameRule = body('name')
  .notEmpty().withMessage((value, {req}) => req.__('validation.required', req.__('fields.category')))
  .isLength({min: 3}).withMessage((value, {req}) => req.__('validation.minlength', req.__('fields.category')))
  .isLength({max: 32}).withMessage((value, {req}) => req.__('validation.maxlength', req.__('fields.category')))
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });