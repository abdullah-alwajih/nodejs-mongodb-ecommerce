const express = require('express');
const router = express.Router({mergeParams: true}); // Initialize router
const {authenticated, authenticateAndAuthorize} = require("../../../core/middlewares/authMiddleware");

const {
  getSubCategories,
  getSubCategory,
  storeSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../manager/controllers/sub-category.controller");

const {
  showSubCategoryMiddleware,
  saveSubCategoryMiddleware,
  deleteSubCategoryMiddleware,
  updateSubCategoryMiddleware,
  // setCategoryIdToBodyMiddleware,
  // filterSubcategoryMiddleware,
} = require("./sub-category.middleware");

// Define routes and use middleware
router.route('/')
  .get(createFilterObj, getSubCategories)
  .post(authenticateAndAuthorize('admin', 'manager'), setCategoryIdToBody, saveSubCategoryMiddleware, storeSubCategory);

router.route('/:id/')
  .get(showSubCategoryMiddleware, getSubCategory)
  .put(authenticateAndAuthorize('admin', 'manager'), updateSubCategoryMiddleware, updateSubCategory)
  .delete(authenticateAndAuthorize('admin'), deleteSubCategoryMiddleware, deleteSubCategory);

module.exports = router; // Export the router
