const { Schema, model } = require('mongoose');

const EmployeeSchema = new Schema(
  {
    name: String,
    status: String,
    ordering: Number,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Employee = model('Employee', EmployeeSchema);

module.exports = Employee;
