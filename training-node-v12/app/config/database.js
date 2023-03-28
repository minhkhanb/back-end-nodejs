const mongoose = require('mongoose');

const config = {
  DB_NAME: 'nodejs',
  DB_USER: 'admin',
  DB_PASSWORD: 'ShRAexePjIwDVTvp',
  DB_HOST: 'cluster0.0ozojp9.mongodb.net',

  collection: {
    items: 'items',
    groups: 'groups',
    users: 'users',
  },
};

const connectDatabase = () => {
  const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST} = config;

  mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
  );

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
  connectDatabase
};
