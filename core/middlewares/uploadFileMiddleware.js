const asyncHandler = require('express-async-handler');
const imageProcessor = require("../utils/imageProcessing");
const upload = require("../utils/fileUpload");

const uploadFile = (filePath, fieldName) => asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body[fieldName] = await imageProcessor(req.file.buffer, filePath);
  }
  next();
})

const uploadFiles = (filePath, fields) => asyncHandler(async (req, res, next) => {
  if (!req.files) return next(); // Skip processing if req.files is undefined

  await Promise.all(fields.map(async ({name, maxCount}) => {
    const files = req.files[name];
    if (files?.length) {
      req.body[name] = await imageProcessor(maxCount === 1 ? files[0] : files, filePath);
    }
  }));

  next();
})

const uploadSingle = (filePath, fieldName = 'image') => [upload.single(fieldName), uploadFile(filePath, fieldName)];

const uploadFields = (filePath, fields) => [upload.fields(fields), uploadFiles(filePath, fields)];

module.exports = {uploadSingle, uploadFields}