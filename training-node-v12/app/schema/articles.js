const { Schema, model } = require('mongoose');
const { config } = require('@src/config/database');

const { articles } = config.collection;

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
    timestamps: true,
  }
);

const Articles = model(articles, itemsSchema);

module.exports = Articles;
