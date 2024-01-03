const {createProductRole, updateProductRole} = require("../manager/rules/product");
const {validatorMiddleware, mongoIdRule} = require("../../../config/middlewares/validatorMiddleware");


exports.showProductMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveProductMiddleware = [
  createProductRole,
  validatorMiddleware,
];

exports.updateProductMiddleware = [
  mongoIdRule,
  updateProductRole,
  validatorMiddleware,
];

exports.deleteProductMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];