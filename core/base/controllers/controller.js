const asyncHandler = require('express-async-handler');
const ApiError = require("../models/apiError");
const ApiFeatures = require("./apiFeatures");


exports.delete = (Model) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document) {
      return next(new ApiError(404, `No document for this id ${id}`));
    }

    // Trigger "remove" event when update document
    document.remove();

    res.status(204).send();
  });

exports.update = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!document) {
      return next(
        new ApiError(404, `No document for this id ${req.params.id}`,)
      );
    }

    // Trigger "save" event when update document
    document.save();

    res.status(200).json({data: document});
  });

exports.store = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({data: document});
  });

exports.show = (Model, populateOptions) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    // 1) Build query
    let query = Model.findById(id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    // 2) Execute query
    const document = await query;

    if (!document) {
      return next(new ApiError(404, `No document for this id ${id}`,));
    }
    res.status(200).json({data: document});
  });

exports.index = (Model, searchableFields) =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    // Build query
    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(searchableFields)
      .limitFields()
      .sort();

    // Execute query
    const {mongooseQuery, paginationResult} = apiFeatures;
    const documents = await mongooseQuery;

    res.status(200).json({results: documents.length, paginationResult, data: documents});
  });