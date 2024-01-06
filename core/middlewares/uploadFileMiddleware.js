const asyncHandler = require('express-async-handler');
const imageProcessor = require("../utils/imageProcessing");
const upload = require("../utils/fileUpload");

const uploadFile = (filePath, fieldName) => asyncHandler(async (req, res, next) => {
  const {file} = req.file;
  if (file) req.body[fieldName] = await imageProcessor(file, filePath);
  next()
})

const uploadFiles = (filePath, fields) => asyncHandler(async (req, res, next) => {
  for (const field of fields) {
    const files = req.files[field.name];
    if (files && files.length > 0) {
      req.body[field.name] = await imageProcessor(field.maxCount === 1 ? files[0] : files, filePath);
    }
  }
  next()
})

const uploadSingle = (filePath, fieldName = 'image') => [
  upload.single(fieldName),
  uploadFile(filePath, fieldName)
];

const uploadFields = (filePath, fields) => [
  upload.fields(fields),
  uploadFiles(filePath, fields)
];

module.exports = {uploadSingle, uploadFields}