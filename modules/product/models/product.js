const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Product required'],
        unique: [true, 'Product must be unique'],
        minlength: [3, 'Too short brand name'],
        maxlength: [32, 'Too long brand name'],
      },
      // A and B => shopping.com/a-and-b
      slug: {
        type: String,
        lowercase: true,
      },
      image: String,
    },
    {timestamps: true}
);
const Product = mongoose.model('Product', brandSchema);
module.exports = Product;
