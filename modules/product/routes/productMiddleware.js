const slugify = require('slugify');
const {check, body} = require('express-validator');
const validatorMiddleware = require("../../../config/middlewares/validatorMiddleware");
const {productCreateRule, productUpdateRole} = require("../manager/rules/product");
const {mongoIdRule} = require("../../../config/middlewares/validatorMiddleware");

exports.createProductValidator = [
  productCreateRule,
  validatorMiddleware,
];

exports.getProductValidator = [
  mongoIdRule,
  validatorMiddleware,
];

exports.updateProductValidator = [
  mongoIdRule,
  productUpdateRole,
  validatorMiddleware,
];

exports.deleteProductValidator = [
  mongoIdRule,
  validatorMiddleware,
];