const mongoose = require('mongoose');
const categorySchema = require("../schema/categorySchema");

const setImageURL = (doc) => {
  if (doc.image) doc.image = `${process.env.BASE_URL}/categories/${doc.image}`;
};
// findOne, findAll and update
categorySchema.post('init', setImageURL);

// create
categorySchema.post('save', setImageURL);


const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;