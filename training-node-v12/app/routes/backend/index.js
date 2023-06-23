const express = require('express');
const { config } = require('@src/config/database');

const { groups, items, users, menus, categories, articles } = config.collection;

const adminRouter = express.Router();

adminRouter.use('/', require('./home'));
adminRouter.use('/dashboard', require('./dashboard'));
adminRouter.use(`/${groups}`, require('./groups'));
adminRouter.use(`/${items}`, require('./items'));
adminRouter.use(`/${users}`, require('./users'));
adminRouter.use(`/${menus}`, require('./menus'));
adminRouter.use(`/${categories}`, require('./categories'));
adminRouter.use(`/${articles}`, require('./articles'));

module.exports = adminRouter;
