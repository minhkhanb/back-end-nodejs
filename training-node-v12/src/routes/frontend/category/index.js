const express = require('express');

const app = express.Router();

const layout = 'frontend';

app.get('/', (req, res) => {
  res.render('client/page/category', { layout });
});

module.exports = app;
