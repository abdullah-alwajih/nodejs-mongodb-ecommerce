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
const {authenticated, authorized} = require("../../../core/middlewares/authMiddleware"); // Import subCategoryRoute

// Define routes and use middleware
router.route('/')
  .get(getCategories)
  .post(authenticated, authorized('admin', 'manager'), saveCategoryMiddleware, storeCategory);

router.route('/:id/')
  .get(showCategoryMiddleware, getCategory)
  .put(authenticated, authorized('admin', 'manager'), updateCategoryMiddleware, updateCategory)
  .delete(authenticated, authorized('admin'), deleteCategoryMiddleware, deleteCategory);

router.use('/:categoryId/subcategories/', subCategoryRoute); // Use subCategoryRoute

module.exports = router; // Export the router
