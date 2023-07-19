const mongoose = require('mongoose');
const databaseConfig = require('../config/database');

const Schema = new mongoose.Schema({
    name: String,
    status: String,
    ordering: Number,
    group_acp: String,
    created: {
      user_name: String,
      user_id: Number
    },
    modify: {
      user_name: String,
      user_id: Number
    },
    editorData:String

  },
  { timestamps: true });

module.exports = mongoose.model(databaseConfig.COL_GROUPS, Schema)