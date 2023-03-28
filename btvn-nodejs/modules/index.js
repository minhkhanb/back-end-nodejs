const path = require('path');
const fs = require('fs');

var normalizedPath = path.join(__dirname);

const modules = {};

fs.readdirSync(normalizedPath).forEach(function (file) {
  if (!/index/.test(file)) {
    const modular = require(normalizedPath + '/' + file);

    for (const fn in modular) {
      modules[fn] = modular[fn];
    }
  }
});

module.exports = modules;
