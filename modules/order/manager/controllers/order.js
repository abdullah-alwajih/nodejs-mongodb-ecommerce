const controller = require("../../../../core/base/controllers/controller");
const Order = require("../../data/models/order");

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = controller.index(Order);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = controller.show(Order);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.storeBrand = controller.store(Order);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = controller.update(Order);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = controller.delete(Order);