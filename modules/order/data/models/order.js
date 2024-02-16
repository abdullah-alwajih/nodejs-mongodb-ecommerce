const mongoose = require('mongoose');
const orderSchema = require("../schema/orderSchema");

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user', select: 'name profileImg email phone',
  }).populate({
    path: 'cartItems.product', select: 'title imageCover ',
  });

  next();
});

module.exports = mongoose.model('Order', orderSchema);

