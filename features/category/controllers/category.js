const Category = require("../models/category");
const slugify = require('slugify')
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({data: categories});
});

exports.show = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json({message: `No category for this id ${id}`});
  } else {
    res.status(200).json({data: category});
  }
});

exports.save = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await Category.create({name, slug: slugify(name)});
  res.status(201).json({data: category});
});


exports.update = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const category = await Category.findByIdAndUpdate(
      id,
      {name, slug: slugify(name)},
      {new: true}
  );
  if (!category) {
    res.status(404).json({message: `No category for this id ${id}`});
  } else {
    res.status(200).json({data: category});
  }
});


exports.destroy = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    res.status(404).json({message: `No category for this id ${id}`});
  } else {
    res.status(204).send();
  }
});



