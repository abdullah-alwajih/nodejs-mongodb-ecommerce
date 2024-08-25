const {validateCategoryName} = require("../manager/validators/category.validator");
const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");
const {uploadSingle} = require("../../../core/middlewares/uploadFileMiddleware");
const {mongoIdRule} = require("../../../core/validators/mongoIdRule");

const uploadImage = uploadSingle('categories')

exports.showCategoryMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveCategoryMiddleware = [
  uploadImage,
  validateCategoryName,
  validatorMiddleware,
];

exports.updateCategoryMiddleware = [
  mongoIdRule,
  validateCategoryName,
  validatorMiddleware,
];

exports.deleteCategoryMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];
