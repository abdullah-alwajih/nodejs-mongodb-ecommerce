const factory = require("../../../config/base/controllers/handlersFactory");
const Product = require("../models/product");

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = factory.index(Product, ['title', 'description']);

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.show(Product);

// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.storeProduct = factory.store(Product);
// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.update(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = factory.delete(Product);