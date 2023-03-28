const http = require('http');

const { hostname, port } = require('./config');
const { onReq } = require('./utils/func');

http.createServer(onReq).listen(port, hostname, () => {
  console.log(`Server running at http://localhost:${port}`);
});