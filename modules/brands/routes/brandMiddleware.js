const {mongoIdRule, brandNameRule} = require("../manager/rules/brand");
const {validatorMiddleware} = require("../../../config/middlewares/validatorMiddleware");
const {imageProcessor, appDiskStorage} = require("../../../config/storages/appDiskStorage");


const imageProcessorBrand = imageProcessor('brands')

const uploadBrandImage = appDiskStorage.single('image')

exports.showBrandMiddleware = [
  mongoIdRule,
  validatorMiddleware,
];

exports.saveBrandMiddleware = [
  uploadBrandImage,
  imageProcessorBrand,
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
