const {createProductRole, updateProductRole} = require("../manager/rules/product");
const {validatorMiddleware, mongoIdRule} = require("../../../core/middlewares/validatorMiddleware");
const {uploadFields} = require("../../../core/middlewares/uploadFileMiddleware");

const fields = [
  {name: 'imageCover', maxCount: 1},
  {name: 'images', maxCount: 3},
]
const uploadProductImages = uploadFields('products', fields);

exports.showProductMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveProductMiddleware = [
  uploadProductImages,
  createProductRole,
  validatorMiddleware,
];

exports.updateProductMiddleware = [
  uploadProductImages,
  mongoIdRule,
  updateProductRole,
  validatorMiddleware,
];

exports.deleteProductMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];