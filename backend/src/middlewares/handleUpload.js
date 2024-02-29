const multer = require("multer");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const compressImage = (fileBuffer) => {
  return sharp(fileBuffer).resize({ width: 800, height: 600 }).toBuffer();
};

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
}).single("ImageUrl");

const imageUploadMiddleware = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  compressImage(req.file.buffer)
    .then((compressedBuffer) => {
      req.file.buffer = compressedBuffer;
      next();
    })
    .catch((error) => {
      next(error);
    });
  return null;
};

module.exports = { upload, imageUploadMiddleware };
