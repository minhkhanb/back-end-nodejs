const express = require('express');

const app = express.Router();

app.get('/', (req, res) => {
  res.render('client/page/home/index', { layout: 'frontend' });
});

module.exports = app;
