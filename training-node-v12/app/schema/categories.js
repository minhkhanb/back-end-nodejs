const { Schema, model } = require('mongoose');
const { config } = require('@src/config/database');

const { categories } = config.collection;

const itemsSchema = new Schema(
  {
    name: String,
    status: String,
    ordering: Number,
    description: String,
    menu: {
      type: Schema.Types.ObjectId,
      ref: 'Menus',
      id: String,
      slug: String,
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

const Categories = model(categories, itemsSchema);

module.exports = Categories;
