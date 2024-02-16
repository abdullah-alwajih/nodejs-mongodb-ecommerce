const mongoose = require('mongoose');
const couponSchema = require("../schema/couponSchema");

// 2- Create model
module.exports = mongoose.model('Coupon', couponSchema);