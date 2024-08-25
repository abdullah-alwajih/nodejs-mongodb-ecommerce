const mongoose = require('mongoose');
const subCategorySchema = require("../schemas/sub-category.schema");


module.exports = mongoose.model('SubCategory', subCategorySchema);