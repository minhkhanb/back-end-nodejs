const express = require('express');

const app = express.Router();

app.use('/', require('./home'));

module.exports = app;
