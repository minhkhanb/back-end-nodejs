var express = require('express');
var router = express.Router();

router.use('/', require('./home'));
router.use('/dashboard', require('./dashboard'));
router.use('/items', require('./items'));
router.use('/groups', require('./groups'));
router.use('/users', require('./users'));
router.use('/menus', require('./menus'));
router.use('/categories', require('./categories'));
router.use('/acticles', require('./acticles'));
module.exports = router;
