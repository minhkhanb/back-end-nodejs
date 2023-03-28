const fs = require('fs');

const RoutePath = {
  Home: '/',
  About: '/about'
};

const getRoute = (endpoint) => {
  switch (endpoint) {
    case RoutePath.About:
      return RoutePath.About.concat('.html');

    default:
      return RoutePath.Home.concat('index.html');
  }
};
const route = (endpoint, req, res) => {
  let url = getRoute(endpoint);

  return fs.readFile(`.${url}`, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    }


    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(data);
  });
};

const get = (endpoint, callback) => {
  return fs.readFile(endpoint + '.html', callback);
}

module.exports = {
  route
};