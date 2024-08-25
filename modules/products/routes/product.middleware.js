const {validateCreateProduct, validateUpdateProduct} = require("../manager/validators/product.validator");
const {uploadFields} = require("../../../core/middlewares/uploadFileMiddleware");
const validatorMiddleware = require("../../../core/middlewares/validatorMiddleware");
const {mongoIdRule} = require("../../../core/validators/mongoIdRule");

const fields = [{name: 'imageCover', maxCount: 1}, {name: 'images', maxCount: 3},]
const uploadProductImages = uploadFields('products', fields, {width: 2000, height: 1333});

exports.showProductMiddleware = [mongoIdRule, validatorMiddleware,];

exports.saveProductMiddleware = [uploadProductImages, validateCreateProduct, validatorMiddleware,];

exports.updateProductMiddleware = [uploadProductImages, mongoIdRule, validateUpdateProduct, validatorMiddleware,];

exports.deleteProductMiddleware = [mongoIdRule, validatorMiddleware,];