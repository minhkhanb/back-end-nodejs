var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.send('admin view');
});

router.get('/home', function (req, res, next) {
  res.render('admin/index', { title: 'Admin Dashboard' });
});

module.exports = router;