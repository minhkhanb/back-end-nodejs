const Menu = require('@src/schema/menus');

Menu.pre('updateOne', async function (next) {
  try {
    const updatedFields = this._update.$set;

    // Check if the 'pokemon' field has been modified
    if (updatedFields && updatedFields.menus) {
      // Perform the necessary updates on related documents based on the new 'pokemon' value
      const newMenuId = updatedFields.menus;

      // Your logic to update related documents
      // For example:
      await Menu.updateOne({ _id: newMenuId }, { $set: { someField: someValue } });
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = {
  list: (condition, conditionSort, currentPage, totalItemsPage) => {
    return Menu.find(condition)
      .sort(conditionSort)
      .limit(totalItemsPage)
      .skip((currentPage - 1) * totalItemsPage);
  },
  count: (condition) => {
    return Menu.count(condition);
  },
  changeStatus: (cid, status, options) => {
    const isManyUpdate = Array.isArray(cid);

    const fields = {
      status,
      ...options,
    };

    if (isManyUpdate) {
      return Menu.updateMany({ _id: { $in: cid } }, fields);
    }

    return Menu.updateOne({ _id: cid }, fields);
  },
  changeOrdering: (cid, ordering, options) => {
    const isManyUpdate = Array.isArray(cid);

    if (isManyUpdate) {
      return Promise.all(
        cid.map((id, index) => {
          const fields = {
            ordering: parseInt(ordering[index]),
            ...options,
          };

          return Menu.updateOne({ _id: id }, fields);
        })
      );
    }

    const fields = {
      ordering: parseInt(ordering),
      ...options,
    };

    return Menu.updateOne({ _id: cid }, fields);
  },
  delete: (cid) => {
    const isManyDelete = Array.isArray(cid);

    if (isManyDelete) {
      return Menu.deleteMany({ _id: { $in: cid } });
    }

    return Menu.deleteOne({ _id: cid });
  },
  getMenu: (id) => {
    return Menu.findById(id);
  },
  save: (itemId = '', fields, options) => {
    const isUpdate = itemId !== '';

    const data = {
      ...fields,
      ...options,
    };

    console.log('menu isUpdate: ', isUpdate, itemId, fields);

    if (isUpdate) {
      return Menu.updateOne({ _id: itemId }, data);
    }

    return Menu.create(data);
  },
  changeGroup: (groupId, data) => {
    return Menu.updateOne({ _id: groupId }, data);
  },
  getMenus: (options) => {
    return Menu.find(options, { id: 1, name: 1 });
  },
};
