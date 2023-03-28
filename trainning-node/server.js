const fs = require('fs');
const http = require('http');
const { port } = require('./modules/config');


// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/html');
//   res.end(path.join(__dirname, '/index.html'));
// });
const server = http.createServer((req, res) => {
  fs.readFile('./index.html', function (err, data) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(data);
    res.end();
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});