const {createProductRole, updateProductRole} = require("../manager/validators/product");
const {uploadFields} = require("../../../core/middlewares/uploadFileMiddleware");
const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");
const {mongoIdRule} = require("../../../core/validators/mongoIdRule");

const fields = [{name: 'imageCover', maxCount: 1}, {name: 'images', maxCount: 3},]
const uploadProductImages = uploadFields('products', fields, {width: 2000, height: 1333});

exports.showProductMiddleware = [mongoIdRule, validatorMiddleware,];

exports.saveProductMiddleware = [uploadProductImages, createProductRole, validatorMiddleware,];

exports.updateProductMiddleware = [uploadProductImages, mongoIdRule, updateProductRole, validatorMiddleware,];

exports.deleteProductMiddleware = [mongoIdRule, validatorMiddleware,];