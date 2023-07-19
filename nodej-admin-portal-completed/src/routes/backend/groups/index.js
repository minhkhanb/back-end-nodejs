const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Group router');
});

module.exports = router;
