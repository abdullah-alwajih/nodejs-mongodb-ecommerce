const mongoose = require('mongoose');
const orderSchema = require("../schemas/order.schema");

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name profileImg email phone',
  }).populate({
    path: 'cartItems.products',
    select: 'title imageCover ',
  });

  next();
});

module.exports = mongoose.model('Order', orderSchema);

