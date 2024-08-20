const {uploadSingle} = require("../../../core/middlewares/uploadFileMiddleware");
const {mongoIdRule} = require("../../../core/validators/mongoIdRule");
const {brandNameRule} = require("../manager/validators/brand");
const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");

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
