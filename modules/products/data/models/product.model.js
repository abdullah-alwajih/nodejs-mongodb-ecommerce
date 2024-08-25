const mongoose = require('mongoose');
const productSchema = require("../schemas/product.schema");

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});


// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'category',
    select: 'name -_id',
  });
  next();
});

const setImageURL = (doc) => {
  const path = `${process.env.BASE_URL}/products/`;
  if (doc.imageCover) doc.imageCover = `${path}${doc.imageCover}`;
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => imagesList.push(`${path}${image}`));
    doc.images = imagesList;
  }
};

// findOne, findAll and update
productSchema.post('init', setImageURL);

// create
productSchema.post('save', setImageURL);

module.exports = mongoose.model('Product', productSchema);