const { Schema, model } = require('mongoose');

const ItemSchema = new Schema(
  {
    id: String,
    name: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Item = model('Item', ItemSchema);

module.exports = Item;
