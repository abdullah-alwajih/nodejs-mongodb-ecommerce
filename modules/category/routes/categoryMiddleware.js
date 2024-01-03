const {mongoIdRule, categoryNameRule} = require("../manager/rules/category");
const {validatorMiddleware} = require("../../../config/middlewares/validatorMiddleware");


exports.showCategoryMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveCategoryMiddleware = [
  categoryNameRule,
  validatorMiddleware,
];

exports.updateCategoryMiddleware = [
  mongoIdRule,
  categoryNameRule,
  validatorMiddleware,
];
exports.deleteCategoryMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];
