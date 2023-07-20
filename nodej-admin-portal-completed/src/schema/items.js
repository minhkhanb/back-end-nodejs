const { Schema, model } = require('mongoose');

const itemsSchema = new Schema(
  {
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    ordering: {
      type: Number,
    },
    description: {
      type: String,
    },
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
    timestamps: true,
  }
);

const Items = model('items', itemsSchema);

module.exports = Items;
