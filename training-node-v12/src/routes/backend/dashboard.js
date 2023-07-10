const express = require('express');

const dashboardRouter = express.Router();

dashboardRouter.get('/', (req, res, next) => {
  res.render('page/dashboard/index', {pageTitle: 'Dashboard Manager'});
});

module.exports = dashboardRouter;