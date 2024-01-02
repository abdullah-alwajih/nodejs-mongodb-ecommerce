const express = require('express');
const router = express.Router(); // Initialize router

const {
  getProducts,
  getProduct,
  storeProduct,
  updateProduct,
  deleteProduct
} = require("../manager/controllers/product");

const {
  showBrandMiddleware,
  saveBrandMiddleware,
  updateBrandMiddleware,
  deleteBrandMiddleware,
} = require("./productMiddleware");


// Define routes and use middleware
router.route('/')
.get(getProducts)
.post(saveBrandMiddleware, storeProduct);

router.route('/:id/')
.get(showBrandMiddleware, getProduct)
.put(updateBrandMiddleware, updateProduct)
.delete(deleteBrandMiddleware, deleteProduct);

module.exports = router; // Export the router
