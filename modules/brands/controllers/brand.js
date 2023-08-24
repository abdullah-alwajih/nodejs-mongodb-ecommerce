const Brand = require("../models/brand");
const slugify = require('slugify')
const asyncHandler = require('express-async-handler');
const ApiError = require("../../../config/base/models/apiError");


const checkExists = (brand, id, next) => {
  if (!brand) throw next(new ApiError(404, `No brand for this id ${id}`));
}

exports.index = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  console.log(req.params)
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({data: brands});
});

exports.show = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const brand = await Brand.findById(id);
  checkExists(brand, id, next);
  res.status(200).json({data: brand});
});

exports.save = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const brand = await Brand.create({name, slug: slugify(name)});
  res.status(201).json({data: brand});
});


exports.update = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const brand = await Brand.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});
  checkExists(brand, id, next);
  res.status(200).json({data: brand});
});


exports.destroy = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const brand = await Brand.findByIdAndDelete(id);
  checkExists(brand, id, next);
  res.status(204).send();
});



