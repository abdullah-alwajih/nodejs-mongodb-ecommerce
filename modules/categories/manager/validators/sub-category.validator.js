const {body, param} = require("express-validator");
const slugify = require("slugify");


exports.validateSubCategoryName = body('name')
  .notEmpty().withMessage((value, {req}) => req.__('validation.required', req.__('fields.subcategory')))
  .isLength({min: 2}).withMessage((value, {req}) => req.__('validation.minlength', req.__('fields.subcategory')))
  .isLength({max: 32}).withMessage((value, {req}) => req.__('validation.maxlength', req.__('fields.subcategory')))
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });

exports.validateCategoryId = body('category')
  .notEmpty().withMessage((value, {req}) => req.__('validation.required', req.__('fields.categories')))
  .isMongoId().withMessage((value, {req}) => req.__('validation.invalid_id_format'))