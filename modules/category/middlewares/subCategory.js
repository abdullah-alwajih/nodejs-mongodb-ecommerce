const {subCategoryIdRule, subCategoryNameRule, categoryIdRule} = require("../rules/subCategory");
const validatorMiddleware = require("../../../config/middlewares/validatorMiddleware");


exports.showSubCategoryMiddleware = [subCategoryIdRule, validatorMiddleware,];

exports.saveSubCategoryMiddleware = [subCategoryNameRule, categoryIdRule, validatorMiddleware,];

exports.updateSubCategoryMiddleware = [subCategoryIdRule, subCategoryNameRule, categoryIdRule, validatorMiddleware,];
exports.deleteSubCategoryMiddleware = [subCategoryIdRule, validatorMiddleware,];
