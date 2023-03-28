const {config} = require(`${__config}/database`);
const Items = require(`${__schema}/items`);
const Group = require(`${__schema}/groups`);
const User = require(`${__schema}/users`);

const {groups, items, users} = config.collection;

const statusFilter = [
  {name: 'All', value: 'all', count: 0, class: 'default'},
  {name: 'Active', value: 'active', count: 0, class: 'default'},
  {name: 'Inactive', value: 'inactive', count: 0, class: 'default'}
];

let createStatusFilter = async (collection, currentStatus) => {

  for (let index = 0; index < statusFilter.length; index++) {
    let condition = {};
    const item = statusFilter[index];

    if (item.value !== 'all') {
      condition = {status: item.value};
    }

    if (item.value === currentStatus) {
      statusFilter[index].class = 'active';
    } else {
      statusFilter[index].class = '';
    }

    statusFilter[index].count = await getCount(collection, condition);

  }

  return statusFilter;
};

const getCount = (collection, condition) => {
  if (collection === items) {
    return Items.count(condition);
  } else if (collection === groups) {
    return Group.count(condition);
  } else if (collection === users) {
    return User.count(condition);
  }
};


module.exports = {
  createStatusFilter
};