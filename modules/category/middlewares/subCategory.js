const {subCategoryIdRule, subCategoryNameRule, categoryIdRule} = require("../rules/subCategory");
const validatorMiddleware = require("../../../config/middlewares/validatorMiddleware");


exports.showSubCategoryMiddleware = [subCategoryIdRule, validatorMiddleware,];

exports.saveSubCategoryMiddleware = [subCategoryNameRule, categoryIdRule, validatorMiddleware,];

exports.updateSubCategoryMiddleware = [subCategoryIdRule, subCategoryNameRule, categoryIdRule, validatorMiddleware,];
exports.deleteSubCategoryMiddleware = [subCategoryIdRule, validatorMiddleware,];


exports.setCategoryIdToBodyMiddleware = function (req, res, next) {
  //   Nested route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
}

exports.filterSubcategoryMiddleware = (req, res, next) => {
  const {categoryId} = req.params;
  req.query.filter = categoryId ? {category: categoryId} : {};
  next();
}