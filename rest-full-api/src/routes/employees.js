const express = require('express');

const Employee = require('@src/models/Employee');
const schema = require('@src/config/schema');

const router = express.Router();

/* Get all employees */
router.get('/', async (req, res, next) => {
  try {
    const allEmployees = await Employee.find({});

    res.json(allEmployees);
  } catch (error) {
    next(error);
  }
});

/* Get a specific employee */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ _id: id });

    if (!employee) {
      const error = new Error('Employee does not exist');

      return next(error);
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

/* Create a new employee */
router.post('/', async (req, res, next) => {
  try {
    const { name, job } = req.body;

    await schema.validateAsync({ name, job });

    const employee = await Employee.findOne({ name });

    // Employee already exists
    if (employee) {
      const error = new Error('Employee already exists');
      res.status(409); // conflict error
      return next(error);
    }

    const newUser = await Employee.create({
      name,
      job,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

/* Update a specific employee */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, job } = req.body;

    const result = await schema.validateAsync({ name, job });
    console.log('result: ', result);
    const employee = await Employee.findOne({ _id: id });

    // Employee doest not exist
    if (!employee) {
      return next();
    }

    const updatedEmployee = await Employee.updateOne(
      {
        _id: id,
      },
      { name, job }
    );

    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({ _id: id });

    // Employee does not exist
    if (!employee) {
      return next();
    }

    await Employee.deleteOne({ _id: id });

    res.json({
      message: 'Employee has been deleted',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
