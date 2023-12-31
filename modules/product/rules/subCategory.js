const {body, param} = require("express-validator");

exports.subCategoryIdRule = param('id').isMongoId().withMessage('Invalid sub category id format');

exports.subCategoryNameRule = body('name')
    .notEmpty().withMessage('Sub category required')
    .isLength({min: 2}).withMessage('Too short sub category name')
    .isLength({max: 32}).withMessage('Too long sub category name');

exports.categoryIdRule = body('category')
    .notEmpty().withMessage('Sub category required')
    .isMongoId().withMessage('Invalid sub category id format');