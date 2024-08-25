const mongoose = require('mongoose');
const brandSchema = require("../schema/brand.schema");

const setImageURL = (doc) => {
  if (doc.image) doc.image = `${process.env.BASE_URL}/brands/${doc.image}`;
};
// findOne, findAll and update
brandSchema.post('init', setImageURL);

// create
brandSchema.post('save', setImageURL);

// 2- Create model
module.exports = mongoose.model('Brand', brandSchema);