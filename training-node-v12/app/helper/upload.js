const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload/users');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const maxSize = 1 * 1024 * 1024;

const uploadFile = () => {
  return multer({
    storage: storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter: (req, file, cb) => {
      const { originalname, mimetype } = file;
      const mimetypes = /jpg|jpeg|png|svg|gif/;
      const isValidExt = mimetypes.test(originalname);
      const isValidImage = /^image\//.test(mimetype);

      if (!isValidExt || !isValidImage) {
        req.error = new Error('Invalid image');
        return cb(null, false);
      }

      return cb(null, true);
    },
  });
};

module.exports = {
  uploadFile,
};
