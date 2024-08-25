const controller = require("../../../../core/base/controllers/controller");

const CategoryController = require('../../data/models/category.model');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public

// Build query
exports.getCategories = controller.index(CategoryController);

// @desc    Get specific categories by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = controller.show(CategoryController);

// @desc    Create categories
// @route   POST  /api/v1/categories
// @access  Private
exports.storeCategory = controller.store(CategoryController);

// @desc    Update specific categories
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = controller.update(CategoryController);

// @desc    Delete specific categories
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = controller.delete(CategoryController);