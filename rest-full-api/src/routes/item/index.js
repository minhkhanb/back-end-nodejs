const express = require('express');
// const Item = require('@src/models/Item');

const Item = require('@src/models/Item');

const router = express.Router();

const makeId = (number) => {
  let text = '';
  let possible = 'ABCDEFGHIJKMNOPQRSTUVWXYZ123456789';
  for (let i = 0; i < number; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/* Get all employees */
router.get('/', async (req, res, next) => {
  try {
    const allItems = await Item.find({});

    res.status(200).json({
      success: true,
      data: allItems,
    });
  } catch (error) {
    next(error);
  }
});

/* Get a specific employee */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({ _id: id });

    if (!item) {
      const error = new Error('Item does not exist');

      return next(error);
    }

    res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    next(error);
  }
});

/* Create a new employee */
router.post('/add', async (req, res, next) => {
  try {
    const { name, status, ordering, description } = req.body;

    const employee = await Item.findOne({ name });

    // Employee already exists
    if (employee) {
      const error = new Error('Item already exists');
      return next(error);
    }

    const newUser = await Item.create({
      name,
      status,
      ordering,
      description,
    });

    res.status(200).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
});

/* Update a specific employee */
router.put('/update/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, status, ordering, description } = req.body;

    const item = await Item.findOne({ _id: id });

    // Item doest not exist
    if (!item) {
      return next();
    }

    const updatedItem = await Item.updateOne(
      {
        _id: id,
      },
      { name, status, ordering, description }
    );

    res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await Item.findOne({ _id: id });

    // Item does not exist
    if (!item) {
      return next();
    }

    const deletedItem = await Item.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      data: deletedItem,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
