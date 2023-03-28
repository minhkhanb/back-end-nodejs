const path = require('path');

global.__base = '/';
global.__app = '/app';
global.__config = path.join(__dirname, __app, 'config');
global.__helper = path.join(__dirname, __app, 'helper');
global.__routes = path.join(__dirname, __app, 'routes');
global.__schema = path.join(__dirname, __app, 'schema');
global.__validation = path.join(__dirname, __app, 'validation');
global.__views = path.join(__dirname, __app, 'views');
global.__models = path.join(__dirname, __app, 'models');
