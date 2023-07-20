const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('backend/pages/items');
});

router.get('/form(/:id)?', (req, res) => {
  res.render('backend/pages/items/form');
});

module.exports = router;
