const multer = require("multer");
const ApiError = require("../base/models/apiError");
const path = require('path');

const diskStorage = (filePath) => multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `uploads/${filePath}/`)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, filePath + '-' + path.parse(file.originalname).name + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
  }
})

const fileFilter = function (req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
  if (file.mimetype.startsWith('image')) {
    // To accept the file pass `true`, like so:
    cb(null, true)
  } else {
    // // To reject this file pass `false`, like so:
    // cb(null, false)
    // You can always pass an error if something goes wrong:
    cb(new ApiError(400, 'Only Images allowed'), false)
  }
}

const appDiskStorage = (path) => multer({storage: diskStorage(path), fileFilter: fileFilter})

module.exports = appDiskStorage