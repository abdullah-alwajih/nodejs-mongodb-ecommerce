const mongoose = require('mongoose');
const cartSchema = require("../schema/cartSchema");

// 2- Create model
module.exports = mongoose.model('Cart', cartSchema);
