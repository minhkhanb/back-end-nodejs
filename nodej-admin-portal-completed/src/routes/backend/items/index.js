const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('backend/pages/items');
});

module.exports = router;
