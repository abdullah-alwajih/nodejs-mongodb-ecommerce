const express = require('express');
const router = express.Router({mergeParams: true}); // Initialize router
const {authenticated, authorized} = require("../../../core/middlewares/authMiddleware");

const {
  getSubCategories,
  getSubCategory,
  storeSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../manager/controllers/subCategory");

const {
  showSubCategoryMiddleware,
  saveSubCategoryMiddleware,
  deleteSubCategoryMiddleware,
  updateSubCategoryMiddleware,
  // setCategoryIdToBodyMiddleware,
  // filterSubcategoryMiddleware,
} = require("./subCategoryMiddleware");

// Define routes and use middleware
router.route('/')
  .get(createFilterObj, getSubCategories)
  .post(authenticated, authorized('admin', 'manager'), setCategoryIdToBody, saveSubCategoryMiddleware, storeSubCategory);

router.route('/:id/')
  .get(showSubCategoryMiddleware, getSubCategory)
  .put(authenticated, authorized('admin', 'manager'), updateSubCategoryMiddleware, updateSubCategory)
  .delete(authenticated, authorized('admin'), deleteSubCategoryMiddleware, deleteSubCategory);

module.exports = router; // Export the router
