const express = require('express');
const router = express.Router(); // Initialize router

const {
  index, show, save, update, destroy
} = require("../controllers/category");

const {
  showCategoryMiddleware, saveCategoryMiddleware, updateCategoryMiddleware, deleteCategoryMiddleware,
} = require("../middlewares/category");

const subCategoryRoute = require("./subCategories"); // Import subCategoryRoute

// Define routes and use middleware
router.route('/')
    .get(index)
    .post(saveCategoryMiddleware, save);

router.route('/:id/')
    .get(showCategoryMiddleware, show)
    .put(updateCategoryMiddleware, update)
    .delete(deleteCategoryMiddleware, destroy);

router.use('/:categoryId/subcategories/', subCategoryRoute); // Use subCategoryRoute

module.exports = router; // Export the router
