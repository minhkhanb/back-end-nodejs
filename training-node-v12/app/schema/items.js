const {Schema, model} = require('mongoose');
const {config} = require(`${__config}/database`);

const {items} = config.collection;

const itemsSchema = new Schema(
  {
    name: String,
    status: String,
    ordering: Number,
    description: String,
    created: {
      user_name: String,
      user_id: Number,
    },
    modify: {
      user_name: String,
      user_id: Number,
    },
  },
  {
    timestamps: true
  }
);

const Items = model(items, itemsSchema);

module.exports = Items;
