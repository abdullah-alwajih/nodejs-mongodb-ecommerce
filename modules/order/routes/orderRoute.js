const express = require('express');
const router = express.Router(); // Initialize router
const {authenticated, authenticateAndAuthorize} = require("../../../core/middlewares/authMiddleware");

const {
  getBrands,
  getBrand,
  storeBrand,
  updateBrand,
  deleteBrand
} = require("../manager/controllers/order");

const {
  showBrandMiddleware,
  saveBrandMiddleware,
  updateBrandMiddleware,
  deleteBrandMiddleware,
} = require("./orderMiddleware");


// Define routes and use middleware
router.route('/')
  .get(getBrands)
  .post(authenticateAndAuthorize('admin', 'manager'), saveBrandMiddleware, storeBrand);

router.route('/:id')
  .get(showBrandMiddleware, getBrand)
  .put(authenticateAndAuthorize('admin', 'manager'), updateBrandMiddleware, updateBrand)
  .delete(authenticateAndAuthorize('admin'), deleteBrandMiddleware, deleteBrand);

module.exports = router; // Export the router
