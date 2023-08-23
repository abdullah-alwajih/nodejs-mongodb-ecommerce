const express = require('express');
const categoryRoute = express.Router(); // Initialize router

const {
  index, show, save, update, destroy
} = require("../controllers/category");

const {
  showCategoryMiddleware,
  saveCategoryMiddleware,
  updateCategoryMiddleware,
  deleteCategoryMiddleware,
} = require("../middlewares/category");

const subCategoryRoute = require("./subCategoryRoute"); // Import subCategoryRoute

// Define routes and use middleware
categoryRoute.route('/')
    .get(index)
    .post(saveCategoryMiddleware, save);

categoryRoute.route('/:id/')
    .get(showCategoryMiddleware, show)
    .put(updateCategoryMiddleware, update)
    .delete(deleteCategoryMiddleware, destroy);

categoryRoute.use('/:categoryId/subcategories/', subCategoryRoute); // Use subCategoryRoute

module.exports = categoryRoute; // Export the router
