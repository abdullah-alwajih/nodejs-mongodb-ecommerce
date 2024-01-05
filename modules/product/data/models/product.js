const mongoose = require('mongoose');
const productSchema = require("../schema/productSchema");

const setImageURL = (doc) => {
  if (doc.imageCover) doc.imageCover = `${process.env.BASE_URL}/products/${doc.imageCover}`;
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => imagesList.push(`${process.env.BASE_URL}/products/${image}`));
    doc.images = imagesList;
  }
};

// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name -_id',
  });
  next();
});

// findOne, findAll and update
productSchema.post('init', setImageURL);

// create
productSchema.post('save', setImageURL);

module.exports = mongoose.model('Product', productSchema);