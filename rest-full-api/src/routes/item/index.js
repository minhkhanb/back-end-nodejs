const express = require('express');
// const Item = require('@src/models/Item');

const app = express.Router();

app.get('/', (req, res, _next) => {
  res.send('Get all items');
});

app.get('/:id', (req, res, _next) => {
  res.send('Get item ' + req.params.id);
});

app.post('/add', (req, res, _next) => {
  res.send('Add item');
});

app.put('/update/:id', (req, res, _next) => {
  res.send('Update item ' + req.params.id);
});

app.delete('/delete/:id', (req, res, _next) => {
  res.send('Delete item ' + req.params.id);
});

module.exports = app;
