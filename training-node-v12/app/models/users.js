const User = require('@src/schema/users');

module.exports = {
  list: (condition, conditionSort, currentPage, totalItemsPage) => {
    return User.find(condition)
      .sort(conditionSort)
      .limit(totalItemsPage)
      .skip((currentPage - 1) * totalItemsPage);
  },
  count: (condition) => {
    return User.count(condition);
  },
  changeStatus: (cid, status, options) => {
    const isManyUpdate = Array.isArray(cid);

    const fields = {
      status,
      ...options,
    };

    if (isManyUpdate) {
      return User.updateMany({ _id: { $in: cid } }, fields);
    }

    return User.updateOne({ _id: cid }, fields);
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

          return User.updateOne({ _id: id }, fields);
        })
      );
    }

    const fields = {
      ordering: parseInt(ordering),
      ...options,
    };

    return User.updateOne({ _id: cid }, fields);
  },
  delete: (cid) => {
    const isManyDelete = Array.isArray(cid);

    if (isManyDelete) {
      return User.deleteMany({ _id: { $in: cid } });
    }

    return User.deleteOne({ _id: cid });
  },
  getUser: (id) => {
    return User.findById(id);
  },
  save: (itemId = '', fields, options) => {
    const isUpdate = itemId !== '';

    const data = {
      ...fields,
      ...options,
    };

    if (isUpdate) {
      return User.updateOne({ _id: itemId }, data);
    }

    return User.create(data);
  },
};
