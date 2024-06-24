const express = require('express');
const router = express.Router(); // Initialize router

const {
  getCategories,
  getCategory,
  storeCategory,
  updateCategory,
  deleteCategory
} = require("../manager/controllers/category");

const {
  showCategoryMiddleware,
  saveCategoryMiddleware,
  updateCategoryMiddleware,
  deleteCategoryMiddleware,
} = require("./categoryMiddleware");

const subCategoryRoute = require("./subCategoriesRoute");
const {authenticateAndAuthorize} = require("../../../core/middlewares/authMiddleware"); // Import subCategoryRoute

// Define routes and use middleware
router.route('/')
  .get(getCategories)
  .post(authenticateAndAuthorize('admin', 'manager'), saveCategoryMiddleware, storeCategory);

router.route('/:id/')
  .get(showCategoryMiddleware, getCategory)
  .put(authenticateAndAuthorize('admin', 'manager'), updateCategoryMiddleware, updateCategory)
  .delete(authenticateAndAuthorize('admin'), deleteCategoryMiddleware, deleteCategory);

router.use('/:categoryId/subcategories/', subCategoryRoute); // Use subCategoryRoute

module.exports = router; // Export the router
