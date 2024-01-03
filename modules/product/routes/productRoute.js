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
  showProductMiddleware,
  saveProductMiddleware,
  updateProductMiddleware,
  deleteProductMiddleware,
} = require("./productMiddleware");


// Define routes and use middleware
router.route('/')
  .get(getProducts)
  .post(saveProductMiddleware, storeProduct);

router.route('/:id')
  .get(showProductMiddleware, getProduct)
  .put(updateProductMiddleware, updateProduct)
  .delete(deleteProductMiddleware, deleteProduct);

module.exports = router; // Export the router
