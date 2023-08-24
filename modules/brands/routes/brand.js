const express = require('express');
const router = express.Router(); // Initialize router

const {
  index, show, save, update, destroy
} = require("../controllers/brand");

const {
  showBrandMiddleware, saveBrandMiddleware, updateBrandMiddleware, deleteBrandMiddleware,
} = require("../middlewares/brand");


// Define routes and use middleware
router.route('/')
    .get(index)
    .post(saveBrandMiddleware, save);

router.route('/:id/')
    .get(showBrandMiddleware, show)
    .put(updateBrandMiddleware, update)
    .delete(deleteBrandMiddleware, destroy);

module.exports = router; // Export the router
