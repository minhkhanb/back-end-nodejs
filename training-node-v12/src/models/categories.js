const Category = require('@src/schema/categories');

module.exports = {
  list: (condition, conditionSort, currentPage, totalItemsPage) => {
    return Category.find(condition)
      .sort(conditionSort)
      .limit(totalItemsPage)
      .skip((currentPage - 1) * totalItemsPage);
  },
  count: (condition) => {
    return Category.count(condition);
  },
  changeStatus: (cid, status, options) => {
    const isManyUpdate = Array.isArray(cid);

    const fields = {
      status,
      ...options,
    };

    if (isManyUpdate) {
      return Category.updateMany({ _id: { $in: cid } }, fields);
    }

    return Category.updateOne({ _id: cid }, fields);
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

          return Category.updateOne({ _id: id }, fields);
        })
      );
    }

    const fields = {
      ordering: parseInt(ordering),
      ...options,
    };

    return Category.updateOne({ _id: cid }, fields);
  },
  delete: (cid) => {
    const isManyDelete = Array.isArray(cid);

    if (isManyDelete) {
      return Category.deleteMany({ _id: { $in: cid } });
    }

    return Category.deleteOne({ _id: cid });
  },
  getUser: (id) => {
    return Category.findById(id, '_id');
  },
  findOne: (id) => {
    return Category.findOne({ _id: id });
  },
  save: (itemId = '', fields, options) => {
    const isUpdate = itemId !== '';

    const data = {
      ...fields,
      ...options,
    };

    if (isUpdate) {
      return Category.updateOne({ _id: itemId }, data);
    }

    return Category.create(data);
  },
  changeGroup: (groupId, data) => {
    return Category.updateOne({ _id: groupId }, data);
  },
  getGroups: () => {
    return Category.find({}, { id: 1, name: 1 });
  },
};
