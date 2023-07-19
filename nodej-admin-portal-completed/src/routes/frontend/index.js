const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<a href="./admin" class="btn btn-success">Go to admin portal</a>');
});

module.exports = router;
