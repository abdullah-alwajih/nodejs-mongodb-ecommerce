const controller = require("../../../../core/base/controllers/controller");


const asyncHandler = require('express-async-handler');

const Product = require('../../../products/data/models/product.model');
const Coupon = require('../../../coupons/data/models/coupon.model');
const CartController = require('../../data/models/cart.model');
const ApiError = require("../../../../core/base/models/apiError");


const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};

// @desc    Add products to  carts
// @route   POST /api/v1/carts
// @access  Private/User
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const {productId, color} = req.body;
  const product = await Product.findById(productId);

  // 1) Get CartController for logged user
  let cart = await CartController.findOne({user: req.user._id});

  if (!cart) {
    // create carts fot logged user with products
    cart = await CartController.create({
      user: req.user._id,
      cartItems: [{product: productId, color, price: product.price}],
    });
  } else {
    // products exist in carts, update products quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );

    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    } else {
      // products not exist in carts,  push products to cartItems array
      cart.cartItems.push({product: productId, color, price: product.price});
    }
  }

  // Calculate total carts price
  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: 'success',
    message: 'Product added to carts successfully',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Get logged user carts
// @route   GET /api/v1/carts
// @access  Private/User
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await CartController.findOne({user: req.user._id});

  if (!cart) {
    return next(
      new ApiError(`There is no cart for this user id : ${req.user._id}`, 404)
    );
  }

  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Remove specific carts item
// @route   DELETE /api/v1/carts/:itemId
// @access  Private/User
exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await CartController.findOneAndUpdate(
    {user: req.user._id},
    {
      $pull: {cartItems: {_id: req.params.itemId}},
    },
    {new: true}
  );

  calcTotalCartPrice(cart);
  cart.save();

  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    clear logged user carts
// @route   DELETE /api/v1/carts
// @access  Private/User
exports.clearCart = asyncHandler(async (req, res, next) => {
  await CartController.findOneAndDelete({user: req.user._id});
  res.status(204).send();
});

// @desc    Update specific carts item quantity
// @route   PUT /api/v1/carts/:itemId
// @access  Private/User
exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const {quantity} = req.body;

  const cart = await CartController.findOne({user: req.user._id});
  if (!cart) {
    return next(new ApiError(`there is no cart for user ${req.user._id}`, 404));
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(
      new ApiError(`there is no item for this id :${req.params.itemId}`, 404)
    );
  }

  calcTotalCartPrice(cart);

  await cart.save();

  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc    Apply coupons on logged user carts
// @route   PUT /api/v1/carts/applyCoupon
// @access  Private/User
exports.applyCoupon = asyncHandler(async (req, res, next) => {
  // 1) Get coupons based on coupons name
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expire: {$gt: Date.now()},
  });

  if (!coupon) {
    return next(new ApiError(`Coupon is invalid or expired`));
  }

  // 2) Get logged user carts to get total carts price
  const cart = await CartController.findOne({user: req.user._id});

  const totalPrice = cart.totalCartPrice;

  // 3) Calculate price after priceAfterDiscount
  const totalPriceAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2); // 99.23

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  await cart.save();

  res.status(200).json({
    status: 'success',
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
