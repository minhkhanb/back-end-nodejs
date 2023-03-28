var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Server dang chay')
  res.render('index', { title: 'Hello Hi Ciao' });
});

module.exports = router;
