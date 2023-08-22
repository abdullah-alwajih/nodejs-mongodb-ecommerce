const validatorMiddleware = require("../../../config/middlewares/validatorMiddleware");
const {mongoIdRule, categoryNameRule} = require("./rules");


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
