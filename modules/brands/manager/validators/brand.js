const {body} = require("express-validator");
const slugify = require("slugify");


exports.brandNameRule = body('name')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.required', req.__('fields.brand')))
  .isLength({min: 3}).withMessage((value, {req}) => req.__('validation.minlength', req.__('fields.brand')))
  .isLength({max: 32}).withMessage((value, {req}) => req.__('validation.maxlength', req.__('fields.brand')))
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });