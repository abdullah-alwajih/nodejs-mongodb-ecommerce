const {body, param} = require("express-validator");
const slugify = require("slugify");

exports.mongoIdRule = param('id').isMongoId().withMessage('Invalid brand id format');

exports.brandNameRule = body('name')
  .notEmpty()
  .withMessage((value, {req}) => req.__('validation.required', req.__('fields.brand')))

  .isLength({min: 3}).withMessage('Too short Brand name')
  .isLength({max: 32}).withMessage('Too long Brand name')
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });