const { config } = require('@src/config/database');
const Items = require('@src/schema/items');
const Group = require('@src/schema/groups');
const User = require('@src/schema/users');
const fs = require('fs');

const { groups, items, users, menus, categories, articles } = config.collection;

const statusFilter = [
  { name: 'All', value: 'all', count: 0, class: 'default' },
  { name: 'Active', value: 'active', count: 0, class: 'default' },
  { name: 'Inactive', value: 'inactive', count: 0, class: 'default' },
];

let createStatusFilter = async (collection, currentStatus) => {
  for (let index = 0; index < statusFilter.length; index++) {
    let condition = {};
    const item = statusFilter[index];

    if (item.value !== 'all') {
      condition = { status: item.value };
    }

    if (item.value === currentStatus) {
      statusFilter[index].class = 'active';
    } else {
      statusFilter[index].class = '';
    }

    statusFilter[index].count = await getCount(collection, condition);
  }

  console.log('curr: ', statusFilter);

  return statusFilter;
};

const getCount = (collection, condition) => {
  if (collection === items) {
    return Items.count(condition);
  } else if (collection === groups) {
    return Group.count(condition);
  } else if (collection === users) {
    return User.count(condition);
  } else if (collection === menus) {
    return User.count(condition);
  } else if (collection === categories) {
    return User.count(condition);
  } else if (collection === articles) {
    return User.count(condition);
  }
};

const removeFile = (uploadFolder, collection, filename) => {
  const filePath = `${uploadFolder}/${collection}/${filename}`;
  const isExistAvatar = fs.existsSync(filePath);

  if (filename && isExistAvatar) {
    try {
      fs.unlinkSync(filePath);

      console.log(`successfully deleted${filename}`);
    } catch (error) {
      console.error('there was an error:', error.message);
    }
  }
};

module.exports = {
  createStatusFilter,
  removeFile,
};
