const fs = require('fs');
const path = require('path');

const { mimeTypes } = require('../config');

const readFile = (filePath, res, mimeType) => {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(err.message);
    }

    res.writeHead(200, { 'Content-Type': mimeType });
    res.write(data);
    res.end();
  });
};

const sendFile = (fileName, { filePath, res, mimeType }) => {
  if (mimeType === mimeTypes.html) {
    const fullFilePath = filePath.endsWith(fileName) ? filePath.concat('.html') : path.join(filePath, fileName.concat('.html'));

    return readFile(fullFilePath, res, mimeType);
  } else if ([mimeTypes.css, mimeTypes.js].includes(mimeType)) {
    return readFile(filePath, res, mimeType);
  }
};

module.exports = {
  readFile,
  sendFile,
};