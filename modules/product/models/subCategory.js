const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'SubCategory required'],
    unique: [true, 'SubCategory must be unique'],
    minlength: [2, 'Too short sub category name'],
    maxlength: [32, 'Too long sub category name'],
  }, // A and B => shopping.com/a-and-b
  slug: {
    type: String, lowercase: true,
  }, category: {
    type: mongoose.Schema.ObjectId, ref: 'Category', required: [true, 'SubCategory must be belong to parent category'],
  }
}, {timestamps: true});

module.exports = mongoose.model('SubCategory', subCategorySchema);
