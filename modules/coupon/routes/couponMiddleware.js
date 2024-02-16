const {mongoIdRule, brandNameRule} = require("../manager/validators/coupon");
const {validatorMiddleware} = require("../../../core/middlewares/validatorMiddleware");
const {uploadSingle} = require("../../../core/middlewares/uploadFileMiddleware");

const uploadBrandImage = uploadSingle('brands')

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
  uploadBrandImage,
  brandNameRule,
  validatorMiddleware,
];
exports.deleteBrandMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];
