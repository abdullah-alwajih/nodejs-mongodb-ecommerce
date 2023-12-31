const express = require('express');
const router = express.Router({mergeParams: true}); // Initialize router

const {
  getSubCategories,
  getSubCategory,
  storeSubCategory,
  updateSubCategory,
  deleteSubCategory
} = require("../controllers/subCategory");

const {
  showSubCategoryMiddleware,
  saveSubCategoryMiddleware,
  deleteSubCategoryMiddleware,
  updateSubCategoryMiddleware,
  setCategoryIdToBodyMiddleware, filterSubcategoryMiddleware,
} = require("../middlewares/subCategory");

// Define routes and use middleware
router.route('/')
    .get(filterSubcategoryMiddleware, getSubCategories)
    .post(setCategoryIdToBodyMiddleware, saveSubCategoryMiddleware, storeSubCategory);

router.route('/:id/')
    .get(showSubCategoryMiddleware, getSubCategory)
    .put(updateSubCategoryMiddleware, updateSubCategory)
    .delete(deleteSubCategoryMiddleware, deleteSubCategory);

module.exports = router; // Export the router
