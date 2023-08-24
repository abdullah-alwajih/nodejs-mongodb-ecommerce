const {body, param} = require("express-validator");

exports.mongoIdRule = param('id').isMongoId().withMessage('Invalid brand id format');

exports.brandNameRule = body('name')
    .notEmpty().withMessage('brand required')
    .isLength({min: 3}).withMessage('Too short brand name')
    .isLength({max: 32}).withMessage('Too long brand name');