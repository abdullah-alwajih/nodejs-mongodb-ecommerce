const {body, param} = require("express-validator");
const slugify = require("slugify");


exports.brandNameRule = body('name')
  .notEmpty().withMessage('Brand required')
  .isLength({min: 3}).withMessage('Too short Brand name')
  .isLength({max: 32}).withMessage('Too long Brand name')
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });