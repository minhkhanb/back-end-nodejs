const cookieParser = require('cookie-parser');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash-notification');
const path = require('path');
const session = require('express-session');

const { connectDatabase } = require('@src/config/db');
const system = require('@src/config/system');
const { notFound } = require('@src/middlewares');

// Connect to database
connectDatabase();

const app = express();

app.use(cookieParser());
app.use(expressLayouts);
app.set('layout', './backend');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

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

app.use(`/${system.backendPrefix}`, require('@src/routes/backend'));
app.use(`/${system.frontendPrefix}`, require('@src/routes/frontend'));

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(function (err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { pageTitle: 'File not Found' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
