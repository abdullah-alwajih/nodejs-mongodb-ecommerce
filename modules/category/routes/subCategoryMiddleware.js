const {subCategoryNameRule, categoryIdRule} = require("../manager/validators/subCategory");
const {validatorMiddleware} = require("../../../core/middlewares/validatorMiddleware");
const {mongoIdRule} = require("../../../core/validators/mongoIdRule");


exports.showSubCategoryMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveSubCategoryMiddleware = [
  subCategoryNameRule,
  categoryIdRule,
  validatorMiddleware,
];

exports.updateSubCategoryMiddleware = [
  mongoIdRule,
  subCategoryNameRule,
  categoryIdRule,
  validatorMiddleware,
];

exports.deleteSubCategoryMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];


// exports.setCategoryIdToBodyMiddleware = function (req, res, next) {
//   //   Nested route
//   if (!req.body.category) req.body.category = req.params.categoryId;
//   next();
// }
//
// exports.filterSubcategoryMiddleware = (req, res, next) => {
//   const {categoryId} = req.params;
//   req.query.filter = categoryId ? {category: categoryId} : {};
//   next();
// }