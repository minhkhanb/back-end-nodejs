const { Schema, model } = require('mongoose');
const { config } = require('@src/config/database');

const { articles } = config.collection;

const itemsSchema = new Schema(
  {
    name: String,
    slug: String,
    status: String,
    categoryId: String,
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'categories',
      },
    ],
    thumbnail: String,
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
