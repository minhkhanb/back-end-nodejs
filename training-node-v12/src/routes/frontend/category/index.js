const express = require('express');
const ArticleQuery = require('@src/models/articles');

const app = express.Router();

const layout = 'frontend';

app.get('/', async (req, res) => {
  const items = await ArticleQuery.listPosition();
  res.render('client/page/category', { layout, top_post: true, items });
});

module.exports = app;
