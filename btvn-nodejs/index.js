const http = require('http');
const fs = require('fs');
const path = require('path');

const { port, mimeTypes } = require('./config');
const { sendFile, sendCss, sendJs } = require('./modules');

const { html, css, js } = mimeTypes;

const admin = path.join(process.cwd(), './admin');

const app = http.createServer((req, res) => {
  const endpoint = req.url;

  const filePath = path.join(admin, endpoint);

  if (endpoint.endsWith('/')) {
    sendFile('index', { filePath, res, mimeType: html });
  }

  if (endpoint.endsWith('/login')) {
    sendFile('login', { filePath, res, mimeType: html });
  }

  if (endpoint.indexOf('.css') !== -1) {
    // Load css
    sendFile('', { filePath, res, mimeType: css });
  }

  if (endpoint.indexOf('.js') !== -1) {
    // Load js
    sendFile('', { filePath, res, mimeType: js });
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});