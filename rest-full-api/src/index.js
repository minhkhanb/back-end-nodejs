const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Powered-By', 'Node.js');
  res.statusCode = 404;

  res.writeHead(404, {
    'Content-Type': 'application/json',
    'X-Powered-By': 'Node.js'
  });

  res.end(JSON.stringify({
    success: false,
    error: 'NOT FOUND',
    data: null
  }));
});