const express = require('express');
const homeRouter = express.Router();

homeRouter.get('/', (req, res, next) => {
  res.render('page/home/index', { pageTitle: 'Home Manager', layout: 'backend' });
});

module.exports = homeRouter;
