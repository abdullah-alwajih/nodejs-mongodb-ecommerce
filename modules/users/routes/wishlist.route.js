const express = require('express');

const {
  authenticateAndAuthorize,
} = require("../../../core/middlewares/authMiddleware");


const {
  addProductToWishlist, removeProductFromWishlist, getLoggedUserWishlist,
} = require('../manager/controllers/wishlist.controller');

const router = express.Router();

router.use(authenticateAndAuthorize('user'));

router.route('/').post(addProductToWishlist).get(getLoggedUserWishlist);

router.delete('/:productId', removeProductFromWishlist);

module.exports = router;
