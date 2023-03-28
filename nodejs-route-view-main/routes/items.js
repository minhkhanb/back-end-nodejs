var express = require('express');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Item View');
});

router.get('/list', function(req, res, next) {
  res.render('list-item', { title: 'List Item View' });
});

router.get('/add', function(req, res, next) {
  res.render('add-item', { title: 'Add Item View' });
});

module.exports = router;
