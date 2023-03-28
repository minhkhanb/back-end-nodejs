var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function (req, res, next) {
  res.render('list-video', { title: 'NodeJS List Video' });
});

router.get('/add', function (req, res, next) {
  res.render('add-video', { title: 'NodeJs Add Video' });
});

module.exports = router;
