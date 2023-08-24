const validatorMiddleware = require("../../../config/middlewares/validatorMiddleware");
const {mongoIdRule, brandNameRule} = require("../rules/brand");


exports.showBrandMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveBrandMiddleware = [
  brandNameRule,
  validatorMiddleware,
];

exports.updateBrandMiddleware = [
  mongoIdRule,
  brandNameRule,
  validatorMiddleware,
];
exports.deleteBrandMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];
