const controller = require("../../../../core/base/controllers/controller");
const ProductController = require("../../data/models/product.model");

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = controller.index(ProductController, ['title', 'description']);

// @desc    Get specific products by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = controller.show(ProductController);

// @desc    Create products
// @route   POST  /api/v1/products
// @access  Private
exports.storeProduct = controller.store(ProductController);
// @desc    Update specific products
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = controller.update(ProductController);

// @desc    Delete specific products
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = controller.delete(ProductController);