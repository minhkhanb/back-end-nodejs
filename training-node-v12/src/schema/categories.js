const { Schema, model } = require('mongoose');
const { config } = require('@src/config/database');

const { categories } = config.collection;

const itemsSchema = new Schema(
  {
    name: String,
    status: String,
    ordering: Number,
    slug: String,
    description: String,
    menu: {
      id: String,
      slug: String,
    },
    parentId: String,
    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'articles',
      },
    ],
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
