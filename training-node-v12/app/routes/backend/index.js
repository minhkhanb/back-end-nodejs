const express = require('express');
const {config} = require('@src/config/database');

const {groups, items, users} = config.collection;

const adminRouter = express.Router();

adminRouter.use('/', require('./home'));
adminRouter.use('/dashboard', require('./dashboard'));
adminRouter.use(`/${groups}`, require('./groups'));
adminRouter.use(`/${items}`, require('./items'));
adminRouter.use(`/${users}`, require('./users'));


module.exports = adminRouter;
