const express = require('express');
const ArticleQuery = require('@src/models/articles');

const app = express.Router();

app.get('/', async (req, res) => {
  const items = await ArticleQuery.listPosition();
  res.render('frontend/pages/home/index', { layout: 'frontend', top_post: true, items });
});

module.exports = app;
