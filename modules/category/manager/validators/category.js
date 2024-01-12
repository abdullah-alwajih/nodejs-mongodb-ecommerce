const {body, param} = require("express-validator");
const slugify = require("slugify");

exports.mongoIdRule = param('id').isMongoId().withMessage('Invalid category id format');

exports.categoryNameRule = body('name')
  .notEmpty().withMessage('Category required')
  .isLength({min: 3}).withMessage('Too short category name')
  .isLength({max: 32}).withMessage('Too long category name')
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });