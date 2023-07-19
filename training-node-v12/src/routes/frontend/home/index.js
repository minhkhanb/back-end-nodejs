const express = require('express');
const ArticleQuery = require('@src/models/articles');
const Category = require('@src/schema/categories');

const app = express.Router();

app.get('/', async (req, res) => {
  const categories = await Category.find({ status: 'active' }).sort({ ordering: 'asc' });
  const articlesSpecial = await ArticleQuery.getSpecialArticles();
  const articlesNews = await ArticleQuery.getNewsArticles();

  res.render('client/page/home/index', {
    layout: 'frontend',
    top_post: true,
    categories,
    articlesSpecial,
    articlesNews,
  });
});

module.exports = app;
