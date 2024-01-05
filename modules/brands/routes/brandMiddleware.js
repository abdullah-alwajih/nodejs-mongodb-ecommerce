const {mongoIdRule, brandNameRule} = require("../manager/rules/brand");
const {validatorMiddleware} = require("../../../config/middlewares/validatorMiddleware");
const {uploadSingleImage} = require("../../../config/middlewares/uploadFileMiddleware");


const uploadBrandImage = uploadSingleImage('brands')

exports.showBrandMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveBrandMiddleware = [
  uploadBrandImage,
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
