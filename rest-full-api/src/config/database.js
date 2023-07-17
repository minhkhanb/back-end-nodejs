const mongoose = require('mongoose');

const config = {
  DB_NAME: 'rest-full-api' || 'nodejs',
  DB_USER: 'admin',
  DB_PASSWORD: 'Aa12345!@' || 'ShRAexePjIwDVTvp',
  DB_HOST: 'localhost:12027' || 'cluster0.0ozojp9.mongodb.net',

  collection: {
    item: 'item',
    course: 'course',
  },
};

const connectDatabase = () => {
  const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = config;

  // mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`);
  mongoose.connect(`mongodb://${DB_USER}:${encodeURIComponent(DB_PASSWORD)}@${DB_HOST}/${DB_NAME}`);

  const db = mongoose.connection;

  db.on('error', () => {
    console.error('Connect to database failure');
  });

  db.once('open', () => {
    console.log('Connect to database successfully');
  });
};

module.exports = {
  config,
  connectDatabase,
};
