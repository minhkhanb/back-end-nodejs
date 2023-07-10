const express = require('express');

const app = express.Router();

app.get('/', (req, res) => {
  res.render('frontend', { layout: false });
});

module.exports = app;
