const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('backend/pages/groups');
});

module.exports = router;
