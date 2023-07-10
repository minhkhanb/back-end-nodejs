const express = require('express');
const models = require('@src/schema');

const dashboardRouter = express.Router();

dashboardRouter.get('/', async (req, res) => {
  const countsEntries = await Promise.all(
    Object.entries(models).map(async ([collectionName, model]) => {
      return [[collectionName], await model.count({})];
    })
  );

  const dashboardMetrics = Object.fromEntries(new Map(countsEntries));

  res.render('page/dashboard/index', { pageTitle: 'Dashboard Manager', layout: 'backend', dashboardMetrics });
});

module.exports = dashboardRouter;
