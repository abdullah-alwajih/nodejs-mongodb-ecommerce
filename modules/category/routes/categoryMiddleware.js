const {mongoIdRule, categoryNameRule} = require("../manager/rules/category");
const {validatorMiddleware} = require("../../../config/middlewares/validatorMiddleware");
const {uploadSingleImage} = require("../../../config/middlewares/uploadFileMiddleware");

const uploadImage = uploadSingleImage('categories')

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
