const express = require('express');
const router = express.Router(); // Initialize router

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
.post(saveBrandMiddleware, storeBrand);

router.route('/:id')
.get(showBrandMiddleware, getBrand)
.put(updateBrandMiddleware, updateBrand)
.delete(deleteBrandMiddleware, deleteBrand);

module.exports = router; // Export the router
