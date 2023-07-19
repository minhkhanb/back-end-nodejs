const express = require('express');

const app = express.Router();

app.use('/item', require('./item'));

module.exports = app;
