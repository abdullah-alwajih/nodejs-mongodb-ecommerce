const mongoose = require('mongoose');
const subCategorySchema = require("../schema/subCategorySchema");


module.exports = mongoose.model('SubCategory', subCategorySchema);