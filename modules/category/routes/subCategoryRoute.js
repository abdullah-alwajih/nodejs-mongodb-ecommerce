const express = require('express');
const subCategoryRoute = express.Router({mergeParams: true}); // Initialize router

const {
  index, show, save, update, destroy
} = require("../controllers/subCategory");

const {
  showSubCategoryMiddleware,
  saveSubCategoryMiddleware,
  deleteSubCategoryMiddleware,
  updateSubCategoryMiddleware,
} = require("../middlewares/subCategory");

// Define routes and use middleware
subCategoryRoute.route('/')
    .get(index)
    .post(saveSubCategoryMiddleware, save);

subCategoryRoute.route('/:id/')
    .get(showSubCategoryMiddleware, show)
    .put(updateSubCategoryMiddleware, update)
    .delete(deleteSubCategoryMiddleware, destroy);

module.exports = subCategoryRoute; // Export the router
