const {Schema, model} = require('mongoose');
const {config} = require(`${__config}/database`);

const {groups} = config.collection;

const groupSchema = new Schema(
  {
    name: String,
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

const Group = model(groups, groupSchema);

module.exports = Group;
