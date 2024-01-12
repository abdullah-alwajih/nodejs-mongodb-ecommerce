const {body, param} = require("express-validator");
const slugify = require("slugify");

exports.subCategoryIdRule = param('id').isMongoId().withMessage('Invalid sub category id format');

exports.subCategoryNameRule = body('name')
  .notEmpty().withMessage('SubCategory required')
  .isLength({min: 2}).withMessage('Too short Subcategory name')
  .isLength({max: 32}).withMessage('Too long Subcategory name')
  .custom((val, {req}) => {
    req.body.slug = slugify(val);
    return true;
  });

exports.categoryIdRule = body('category')
  .notEmpty().withMessage('subCategory must be belong to category')
  .isMongoId().withMessage('Invalid Category id format');