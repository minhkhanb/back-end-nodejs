const express = require('express');

const app = express.Router();

app.use('/', require('./home'));
app.use('/categories', require('./category'));
app.use('/post', require('./post'));

module.exports = app;
