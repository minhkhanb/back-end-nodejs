const { Schema, model } = require('mongoose');
const { config } = require('@src/config/database');

const { menus } = config.collection;

const itemsSchema = new Schema(
  {
    name: String,
    slug: String,
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
    timestamps: true,
  }
);

const Menus = model(menus, itemsSchema);

module.exports = Menus;
