const mongoose = require('mongoose');
const cartSchema = require("../schemas/cart.schema");

// 2- Create model
module.exports = mongoose.model('Cart', cartSchema);
