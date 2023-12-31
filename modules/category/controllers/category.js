const factory = require("../../../config/base/controllers/handlersFactory");

const Category = require('../models/category');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

// Build query
exports.getCategories = factory.index(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.show(Category);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.storeCategory = factory.store(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.update(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = factory.delete(Category);