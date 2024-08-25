const controller = require("../../../../core/base/controllers/controller");
const BrandController = require("../../data/models/brand.model");

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = controller.index(BrandController);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = controller.show(BrandController);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.storeBrand = controller.store(BrandController);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = controller.update(BrandController);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = controller.delete(BrandController);