const {uploadSingle} = require("../../../core/middlewares/uploadFileMiddleware");
const {mongoIdRule} = require("../../../core/validators/mongoIdRule");
const {validateBrandName} = require("../manager/validators/brand.validator");
const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");

const uploadBrandImage = uploadSingle('brands')

exports.showBrandMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveBrandMiddleware = [
  uploadBrandImage,
  validateBrandName,
  validatorMiddleware,
];

exports.updateBrandMiddleware = [
  mongoIdRule,
  uploadBrandImage,
  validateBrandName,
  validatorMiddleware,
];

exports.deleteBrandMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];
