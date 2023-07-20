const express = require('express');

const router = express.Router();

const Mode = {
  Create: 'create',
  Update: 'update',
};

router.get('/', (req, res) => {
  res.render('backend/pages/items');
});

router.get('/form(/:id)?', (req, res) => {
  const mode = req.params.id ? Mode.Update : Mode.Create;
  const pageTitle = mode === Mode.Create ? 'Add Item' : 'Update Item';

  res.render('backend/pages/items/form', {
    pageTitle,
  });
});

module.exports = router;
