const factory = require("../../../config/base/controllers/handlersFactory");
const Brand = require("../models/brand");


// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = factory.index(Brand);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = factory.show(Brand);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.storeBrand = factory.store(Brand);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = factory.update(Brand);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = factory.delete(Brand);