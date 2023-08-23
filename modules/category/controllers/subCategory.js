const SubCategory = require("../models/subCategory");
const slugify = require('slugify')
const asyncHandler = require('express-async-handler');
const ApiError = require("../../../config/base/models/apiError");


const checkExists = (category, id, next) => {
  if (!category) throw next(new ApiError(404, `No category for this id ${id}`));
}

exports.index = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategory.find({}).skip(skip).limit(limit);
  // .populate({path: 'category', select: 'name -_id'});
  res.status(200).json({data: subCategories});
});

exports.show = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subCategory = await SubCategory.findById(id);
  // .populate({path: 'category', select: 'name -_id'});
  checkExists(subCategory, id, next);
  res.status(200).json({data: subCategory});
});

exports.save = asyncHandler(async (req, res) => {
  const {name, category} = req.body;
  const subCategory = await SubCategory.create({
    name, slug: slugify(name), category,
  });
  res.status(201).json({data: subCategory});
});


exports.update = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  const {name, category} = req.body;
  const subCategory = await SubCategory.findByIdAndUpdate(id, {name, slug: slugify(name), category}, {new: true});
  checkExists(subCategory, id, next);
  res.status(200).json({data: subCategory});
});


exports.destroy = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const subCategory = await SubCategory.findByIdAndDelete(id);
  checkExists(subCategory, id, next);
  res.status(204).send();
});



