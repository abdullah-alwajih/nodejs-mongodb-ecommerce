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

const subCategoryRoute = require("./subCategories"); // Import subCategoryRoute

// Define routes and use middleware
router.route('/')
.get(getCategories)
.post(saveCategoryMiddleware, storeCategory);

router.route('/:id/')
.get(showCategoryMiddleware, getCategory)
.put(updateCategoryMiddleware, updateCategory)
.delete(deleteCategoryMiddleware, deleteCategory);

router.use('/:categoryId/subcategories/', subCategoryRoute); // Use subCategoryRoute

module.exports = router; // Export the router
