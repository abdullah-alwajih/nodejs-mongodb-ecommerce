const express = require('express');
const router = express.Router({mergeParams: true}); // Initialize router

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
.post(setCategoryIdToBody, saveSubCategoryMiddleware, storeSubCategory);

router.route('/:id/')
.get(showSubCategoryMiddleware, getSubCategory)
.put(updateSubCategoryMiddleware, updateSubCategory)
.delete(deleteSubCategoryMiddleware, deleteSubCategory);

module.exports = router; // Export the router
