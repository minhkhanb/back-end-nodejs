const itemsShema = require('../schema/items');

const statusFilters = [
  { name: 'All', value: 'all', count: 4, link: '#', classes: 'default' },
  { name: 'Active', value: 'active', count: 3, link: '#', classes: 'default' },
  { name: 'InActive', value: 'inactive', count: 0, link: '#', classes: 'default' }
];
const getFilterStatus = async (currentStatus) => {
  return await Promise.all(
    statusFilters.map(async (statusFilter) => {
      const { value, classes } = statusFilter;
      const count = await itemsShema.count(value === 'all' ? {} : { status: value });

      return {
        ...statusFilter,
        count,
        classes: currentStatus === value ? 'success' : classes
      };
    }));
};

const getParams = (params, property, defaultValue) => {
  if (params.hasOwnProperty(property) && params[property] !== undefined) {
    return params[property];
  }

  return defaultValue;
}


module.exports = {
  getFilterStatus,
  getParams
};