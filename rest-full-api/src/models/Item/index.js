const { Schema, model } = require('mongoose');

const ItemSchema = new Schema(
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

const Item = model('Item', ItemSchema);

module.exports = Item;
