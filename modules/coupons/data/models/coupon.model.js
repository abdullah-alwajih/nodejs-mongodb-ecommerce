const mongoose = require('mongoose');
const couponSchema = require("../schemas/coupon.schema");

// 2- Create model
module.exports = mongoose.model('Coupon', couponSchema);