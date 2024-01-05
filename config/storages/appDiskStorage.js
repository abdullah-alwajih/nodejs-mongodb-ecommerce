const multer = require("multer");
const ApiError = require("../base/models/apiError");
const path = require('path');
const asyncHandler = require('express-async-handler');
const sharp = require("sharp");

// const diskStorage = (filePath) => multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `uploads/${filePath}/`)
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     cb(null, filePath + '-' + path.parse(file.originalname).name + '-' + uniqueSuffix + path.extname(file.originalname))
//   }
// })

const storage = multer.memoryStorage()

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

const imageProcessor = (filePath) => asyncHandler(async (req, res, next) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  const fileName = filePath + '-' + path.parse(req.file.originalname).name + '-' + uniqueSuffix + '.jpeg';
  await sharp(req.file.buffer).resize(600, 600).jpeg({quality: 90}).toFile(`uploads/${filePath}/${fileName}`)
  next()
})
const appDiskStorage = multer({storage: storage, fileFilter: fileFilter})

module.exports = {appDiskStorage, imageProcessor}