const express = require('express');
const router = express.Router({mergeParams: true}); // Initialize router

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
router.route('/')
    .get(index)
    .post(saveSubCategoryMiddleware, save);

router.route('/:id/')
    .get(showSubCategoryMiddleware, show)
    .put(updateSubCategoryMiddleware, update)
    .delete(deleteSubCategoryMiddleware, destroy);

module.exports = router; // Export the router
