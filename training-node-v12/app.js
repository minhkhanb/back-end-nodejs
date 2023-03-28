const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash-notification');
const path = require('path');
const session = require('express-session');
// var logger = require('morgan');
require('./module.config');

const {connectDatabase} = require('@src/config/database');
const systemConfig = require('@src/config/system');

// Connect to database
connectDatabase();

const app = express();

app.use(cookieParser());
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'csafas',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  flash(app, {
    viewName: 'notify',
  })
);

app.set('views', __views);
app.set('view engine', 'ejs');
app.set('layout', 'backend');

// app.use(logger('dev'));

app.locals.systemConfig = systemConfig;
app.use(`/${systemConfig.prefixAdmin}`, require(`${__routes}/backend/index`));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('page/error', {pageTitle: 'File not Found'});
});

module.exports = app;
