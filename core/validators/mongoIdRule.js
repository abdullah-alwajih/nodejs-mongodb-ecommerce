const {param} = require("express-validator");

exports.mongoIdRule = param('id')
  .isMongoId()
  .withMessage((value, {req}) => req.__('validation.invalid_id_format'));
