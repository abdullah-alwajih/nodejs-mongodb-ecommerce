const controller = require("../../../../core/base/controllers/controller");

const Category = require('../../data/models/category');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

// Build query
exports.getCategories = controller.index(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = controller.show(Category);

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.storeCategory = controller.store(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = controller.update(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = controller.delete(Category);