const controller = require("../../../../config/base/controllers/controller");
const Product = require("../../data/models/product");

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = controller.index(Product, ['title', 'description']);

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = controller.show(Product);

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.storeProduct = controller.store(Product);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = controller.update(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = controller.delete(Product);