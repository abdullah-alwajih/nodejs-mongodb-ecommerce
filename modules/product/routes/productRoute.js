const express = require('express');
const router = express.Router(); // Initialize router

const {
  authenticated,
  authorized
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
  .post(authenticated, authorized('admin', 'manager'), saveProductMiddleware, storeProduct);

router.route('/:id')
  .get(showProductMiddleware, getProduct)
  .put(authenticated, authorized('admin', 'manager'), updateProductMiddleware, updateProduct)
  .delete(authenticated, authorized('admin'), deleteProductMiddleware, deleteProduct);

module.exports = router; // Export the router
