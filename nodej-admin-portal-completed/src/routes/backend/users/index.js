const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('backend/pages/users');
});

module.exports = router;
