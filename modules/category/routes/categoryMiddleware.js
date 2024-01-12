const {mongoIdRule, categoryNameRule} = require("../manager/validators/category");
const {validatorMiddleware} = require("../../../core/middlewares/validatorMiddleware");
const {uploadSingle} = require("../../../core/middlewares/uploadFileMiddleware");

const uploadImage = uploadSingle('categories')

exports.showCategoryMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveCategoryMiddleware = [
  uploadImage,
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
