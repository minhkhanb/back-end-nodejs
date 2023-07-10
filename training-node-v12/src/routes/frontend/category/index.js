const express = require('express');

const app = express.Router();

app.get('/', (req, res) => {
  res.render('client/page/category/index', { layout: 'frontend' });
});

module.exports = app;
