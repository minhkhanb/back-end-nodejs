const {Schema, model} = require('mongoose');
const {config} = require(`${__config}/database`);

const {users} = config.collection;

const userSchema = new Schema(
  {
    username: String,
    fullname: String,
    email: String,
    group: {
      id: String,
      name: String,
    },
    status: String,
    ordering: Number,
    group_acp: String,
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
  {timestamps: true}
);

const User = model(users, userSchema);

module.exports = User;
