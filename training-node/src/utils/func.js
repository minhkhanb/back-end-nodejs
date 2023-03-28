const fs = require('fs');
const url = require('url');

const readFile = (endpoint, res) => {
  fs.readFile(endpoint, function (err, data) {
    if (err) {
      console.log(err);
      res.writeHead(404);
      res.end('File not found');
    }


    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
};
const onReq = (req, res) => {
  const path = url.parse(req.url).pathname;

  switch (path) {
    case '/':
      readFile('./src/view/index.html', res);
      break;

    case '/about':
      readFile('./src/view/about.html', res);
      break;

    default:
      break;
  }
};

module.exports = {
  onReq
};