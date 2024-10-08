const controller = require("../../../../core/base/controllers/controller");
const SubCategoryController = require('../../data/models/sub-category.model');

exports.setCategoryIdToBody = (req, res, next) => {
  // Nested route (Create)
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = {category: req.params.categoryId};
  req.filterObj = filterObject;
  next();
};

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = controller.index(SubCategoryController);

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = controller.show(SubCategoryController);

// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.storeSubCategory = controller.store(SubCategoryController);

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = controller.update(SubCategoryController);

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private
exports.deleteSubCategory = controller.delete(SubCategoryController);