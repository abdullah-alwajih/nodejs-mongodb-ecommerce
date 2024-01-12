const express = require('express');
const router = express.Router(); // Initialize router
const {authenticated, authorized} = require("../../../core/middlewares/authMiddleware");

const {
  getBrands,
  getBrand,
  storeBrand,
  updateBrand,
  deleteBrand
} = require("../manager/controllers/brand");

const {
  showBrandMiddleware,
  saveBrandMiddleware,
  updateBrandMiddleware,
  deleteBrandMiddleware,
} = require("./brandMiddleware");


// Define routes and use middleware
router.route('/')
  .get(getBrands)
  .post(authenticated, authorized('admin', 'manager'), saveBrandMiddleware, storeBrand);

router.route('/:id')
  .get(showBrandMiddleware, getBrand)
  .put(authenticated, authorized('admin', 'manager'), updateBrandMiddleware, updateBrand)
  .delete(authenticated, authorized('admin'), deleteBrandMiddleware, deleteBrand);

module.exports = router; // Export the router
