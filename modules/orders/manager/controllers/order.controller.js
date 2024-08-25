const controller = require("../../../../core/base/controllers/controller");
const OrderController = require("../../data/models/order.model");

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = controller.index(OrderController);

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = controller.show(OrderController);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.storeBrand = controller.store(OrderController);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = controller.update(OrderController);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = controller.delete(OrderController);