const controller = require("../../../../config/base/controllers/controller");
const Brand = require("../../data/models/brand");

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = controller.index(Brand, ['name', 'slug']);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = controller.show(Brand);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.storeBrand = controller.store(Brand);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = controller.update(Brand);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = controller.delete(Brand);