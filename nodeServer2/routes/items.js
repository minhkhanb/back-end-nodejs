var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('Video');
// });

// router.get('/list', function(req, res, next) {
//   res.render('list-item', { title: 'List item AA BB' });
// });

router.get('/', function(req, res, next) {
  console.log('đã vào');
  res.render('add-item', { title: 'Add item 123' });
});

// router.get('/edit', function(req, res, next) {
//   res.render('edit-item', { title: 'Edit item ' });
// });

module.exports = router;
