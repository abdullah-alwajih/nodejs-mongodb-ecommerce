const express = require('express');
const router = express.Router(); // Initialize router

const {
  authenticated,
  authenticateAndAuthorize
} = require("../../../core/middlewares/authMiddleware");

const {
  getProducts,
  getProduct,
  storeProduct,
  updateProduct,
  deleteProduct
} = require("../manager/controllers/product");

const {
  showProductMiddleware,
  saveProductMiddleware,
  updateProductMiddleware,
  deleteProductMiddleware,
} = require("./productMiddleware");


// Define routes and use middleware
router.route('/')
  .get(getProducts)
  .post(authenticateAndAuthorize('admin', 'manager'), saveProductMiddleware, storeProduct);

router.route('/:id')
  .get(showProductMiddleware, getProduct)
  .put(authenticateAndAuthorize('admin', 'manager'), updateProductMiddleware, updateProduct)
  .delete(authenticateAndAuthorize('admin'), deleteProductMiddleware, deleteProduct);

module.exports = router; // Export the router
