const sharp = require("sharp");
const path = require("path");

const imageProcessor = async (files, filePath) => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  if (Array.isArray(files)) {
    return await Promise.all(files.map(async (file, index) => {
      const fileName = `${filePath}-${uniqueSuffix}-${index + 1}-${path.parse(file.originalname).name.trim().replaceAll(' ', '-')}.jpeg`;
      await sharp(file.buffer).resize(600, 600).jpeg({quality: 90}).toFile(`uploads/${filePath}/${fileName}`);
      return fileName;
    }));
  } else {
    const fileName = `${filePath}-${uniqueSuffix}-${path.parse(files.originalname).name.replaceAll(' ', '-')}.jpeg`;
    await sharp(files.buffer).resize(600, 600).jpeg({quality: 90}).toFile(`uploads/${filePath}/${fileName}`);
    return fileName;
  }
}

module.exports = imageProcessor;