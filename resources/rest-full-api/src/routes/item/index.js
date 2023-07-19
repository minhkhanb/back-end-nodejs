const express = require('express');
const Item = require('@src/models/Item');

const app = express.Router();

const makeId = (numOfChar) => {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

  for (let i = 0; i < numOfChar; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

app.get('/', async (req, res, _next) => {
  const data = await Item.find();

  res.status(200).json({
    success: true,
    data,
    message: 'Get all items successfully',
  });
});

app.get('/:id', (req, res, _next) => {
  res.send('Get item ' + req.params.id);
});

app.post('/add', async (req, res, _next) => {
  const item = {
    id: makeId(5),
    name: req.body.name,
    status: req.body.status,
  };

  const data = await Item.create(item);

  res.status(200).json({ success: true, data, message: 'Create item successfully' });
});

app.put('/update/:id', (req, res, _next) => {
  res.send('Update item ' + req.params.id);
});

app.delete('/delete/:id', (req, res, _next) => {
  res.send('Delete item ' + req.params.id);
});

module.exports = app;
