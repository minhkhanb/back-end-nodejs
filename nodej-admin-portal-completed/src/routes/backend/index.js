const express = require('express');

const router = express.Router();

router.use('/', require('./home'));
router.use('/items', require('./items'));
router.use('/users', require('./users'));
router.use('/groups', require('./groups'));
router.use('/menus', require('./menus'));
router.use('/categories', require('./categories'));
router.use('/articles', require('./articles'));

module.exports = router;
