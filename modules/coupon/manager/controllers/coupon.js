const controller = require("../../../../core/base/controllers/controller");
const Coupon = require("../../data/models/coupon");

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = controller.index(Coupon);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = controller.show(Coupon);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.storeBrand = controller.store(Coupon);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = controller.update(Coupon);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = controller.delete(Coupon);