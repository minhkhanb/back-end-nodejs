var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const configSystem = require('./config/system')


mongoose.connect('mongodb+srv://admin:ShRAexePjIwDVTvp@cluster0.0ozojp9.mongodb.net/nodejs');
var db = mongoose.connection;
  db.on('error', () =>{ console.log('connect fail');});
  db.once('open',  () =>{ console.log('connect success');});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'backend');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.locals.configSystem = configSystem

app.use(`/${configSystem.prefixAdmin}`, require('./routes/backend/index'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error', { pageTitle: 'File Not Found' });
});

module.exports = app;
