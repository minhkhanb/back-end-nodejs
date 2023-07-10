const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash-notification');
const path = require('path');
const session = require('express-session');
// var logger = require('morgan');

const { connectDatabase } = require('@src/config/database');
const systemConfig = require('@src/config/system');
const moment = require('moment');

// Connect to database
connectDatabase();

const app = express();

app.use(cookieParser());
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/client')));

app.use(
  session({
    secret: 'SECRET_KEY',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  flash(app, {
    viewName: 'notify',
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));

app.locals.systemConfig = systemConfig;
app.locals.moment = moment;
app.use(`/${systemConfig.prefixAdmin}`, require('@src/routes/backend'));
app.use(`/${systemConfig.frontend}`, require('@src/routes/frontend'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('page/error', { pageTitle: 'File not Found' });
});

module.exports = app;
