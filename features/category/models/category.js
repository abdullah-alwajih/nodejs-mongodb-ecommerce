const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category required'],
    unique: [true, 'Category required'],
    minLength: [3, 'Too short category name'],
    maxLength: [32, 'Too long category name']
  },
  // A and B => shopping.com/a-and-b
  slug: {
    type: String, lowercase: true,
  },
}, {timestamps: true,});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
