const {validateSubCategoryName, validateCategoryId} = require("../manager/validators/sub-category.validator");
const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");
const {mongoIdRule} = require("../../../core/validators/mongoIdRule");


exports.showSubCategoryMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveSubCategoryMiddleware = [
  validateSubCategoryName,
  validateCategoryId,
  validatorMiddleware,
];

exports.updateSubCategoryMiddleware = [
  mongoIdRule,
  validateSubCategoryName,
  validateCategoryId,
  validatorMiddleware,
];

exports.deleteSubCategoryMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];


// exports.setCategoryIdToBodyMiddleware = function (req, res, next) {
//   //   Nested route
//   if (!req.body.categories) req.body.categories = req.params.categoryId;
//   next();
// }
//
// exports.filterSubcategoryMiddleware = (req, res, next) => {
//   const {categoryId} = req.params;
//   req.query.filter = categoryId ? {categories: categoryId} : {};
//   next();
// }